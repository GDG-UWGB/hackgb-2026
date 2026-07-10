interface Env {
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_DRIVE_FOLDER_ID?: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  let binary = "";
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const len = bytes.byteLength;
  const chunkSize = 8192;
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(binary);
}

async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }).toString(),
  });

  const data: any = await response.json();
  if (data.error) {
    throw new Error(`Google OAuth error: ${data.error_description || data.error}`);
  }
  return data.access_token;
}

async function uploadToGoogleDrive(
  token: string,
  folderId: string | undefined,
  fileName: string,
  fileBuffer: ArrayBuffer,
  fileType: string
): Promise<string> {
  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: fileName,
    parents: folderId ? [folderId] : undefined,
  };

  const metadataStr = JSON.stringify(metadata);

  const parts = [];
  parts.push(new TextEncoder().encode(
    `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${metadataStr}`
  ));
  parts.push(new TextEncoder().encode(
    `\r\n${delimiter}Content-Type: ${fileType}\r\nContent-Transfer-Encoding: base64\r\n\r\n`
  ));

  // Convert binary to base64
  const base64Content = arrayBufferToBase64(fileBuffer);

  parts.push(new TextEncoder().encode(base64Content));
  parts.push(new TextEncoder().encode(closeDelimiter));

  const totalLength = parts.reduce((acc, curr) => acc + curr.length, 0);
  const body = new Uint8Array(totalLength);
  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.length;
  }

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: body,
    }
  );

  const data: any = await response.json();
  if (data.error) {
    throw new Error(`Google Drive Upload error: ${data.error.message}`);
  }
  return data.id;
}

async function makeFilePublic(token: string, fileId: string): Promise<void> {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "reader",
        type: "anyone",
      }),
    }
  );

  const data: any = await response.json();
  if (data.error) {
    throw new Error(`Google Drive Permissions error: ${data.error.message}`);
  }
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;
  const refreshToken = env.GOOGLE_REFRESH_TOKEN;
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID;

  if (!clientId || !clientSecret || !refreshToken) {
    return new Response(
      JSON.stringify({
        error: "Google Drive OAuth credentials are not configured on Cloudflare. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN environment variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file was uploaded." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const token = await getAccessToken(clientId, clientSecret, refreshToken);

    const fileId = await uploadToGoogleDrive(
      token,
      folderId,
      file.name,
      arrayBuffer,
      file.type || "application/pdf"
    );

    await makeFilePublic(token, fileId);

    const url = `https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`;

    return new Response(
      JSON.stringify({ status: "success", url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload handler error:", error);
    const errMsg = error instanceof Error ? error.message : "An unexpected error occurred during file upload.";
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
