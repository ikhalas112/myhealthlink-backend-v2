const { billFilePath } = require('../config');
const sendBill = require('../service/email.service');

const sendmailBill = (req, res) => {
  try {
    const { to, fileName, subject } = req.body;
    const filePath = `${billFilePath}/${fileName}`;
    const mailPayload = {
      to,
      subject,
      fileName,
      filePath,
    };
    sendBill(mailPayload);

    res.status(200).send('sent');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = sendmailBill;
