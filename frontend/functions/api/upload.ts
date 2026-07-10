interface Env {
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY?: string;
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

function pemToDer(pem: string): ArrayBuffer {
  const cleanedPem = pem
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/"/g, "")
    .trim();

  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = cleanedPem
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s+/g, "");

  const binary = atob(pemContents);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function base64UrlEncode(arrayBuffer: ArrayBuffer | Uint8Array): string {
  const base64 = arrayBufferToBase64(arrayBuffer);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function generateJwt(email: string, privateKeyPem: string): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: email,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const textEncoder = new TextEncoder();
  const headerStr = base64UrlEncode(textEncoder.encode(JSON.stringify(header)));
  const claimStr = base64UrlEncode(textEncoder.encode(JSON.stringify(claim)));

  const tokenInput = `${headerStr}.${claimStr}`;
  const inputBuffer = textEncoder.encode(tokenInput);

  const privateKeyBuffer = pemToDer(privateKeyPem);
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBuffer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: { name: "SHA-256" },
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    inputBuffer
  );

  const signatureStr = base64UrlEncode(signature);
  return `${tokenInput}.${signatureStr}`;
}

async function getAccessToken(email: string, privateKeyPem: string): Promise<string> {
  const jwt = await generateJwt(email, privateKeyPem);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
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

  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = env.GOOGLE_PRIVATE_KEY;
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID;

  if (!email || !privateKey) {
    return new Response(
      JSON.stringify({
        error: "Google Drive service account credentials are not configured on Cloudflare. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.",
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
    const token = await getAccessToken(email, privateKey);

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
