const nodemailer = require('nodemailer');
const { email } = require('../config');

const sendBill = async ({ to, fileName, subject, filePath }) => {
  const transporter = nodemailer.createTransport(email.smtp);
  const info = await transporter.sendMail({
    from: email.from,
    to,
    subject,
    html: '',
    attachments: [
      {
        filename: fileName,
        path: filePath,
      },
    ],
  });
  return info.messageId;
};

module.exports = sendBill;
