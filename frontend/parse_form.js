const fs = require('fs');
const content = fs.readFileSync('form_data.js', 'utf8');
const jsonStr = content.replace('var FB_PUBLIC_LOAD_DATA_ = ', '').replace(/;$/, '');
const data = JSON.parse(jsonStr);

const questions = data[1][1];
questions.forEach(q => {
  const title = q[1];
  const type = q[3]; // 0=short answer, 1=paragraph, 2=multiple choice, 3=dropdown, 4=checkboxes, etc
  const questionItem = q[4] && q[4][0];
  if (questionItem) {
    const entryId = questionItem[0];
    const options = questionItem[1] ? questionItem[1].map(o => o[0]) : null;
    console.log(`Title: ${title}\nEntry ID: entry.${entryId}\nType: ${type}\nOptions: ${options ? options.join(', ') : 'N/A'}\n----------------`);
  }
});
