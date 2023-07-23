const pdf = require('pdf-creator-node');
const fs = require('fs');
const phantomjs = require('phantomjs-prebuilt');
const { billFilePath } = require('../config');

const html = fs.readFileSync('src/template/bill.html', 'utf8');

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm',
  phantomPath: phantomjs.path,
};

const billPdf = async (req, res) => {
  const { consumables, totalPrice, patient, createdAt, billNumber, createdBy } = req.body;
  const fileName = `${billNumber}_${Date.now()}.pdf`;
  const document = {
    html,
    data: {
      consumables,
      totalPrice,
      patient,
      createdAt,
      billNumber,
      createdBy,
    },
    path: `${billFilePath}/${fileName}`,
  };
  try {
    await pdf.create(document, options);
    res.status(201).send(fileName);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = billPdf;
