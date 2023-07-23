const pdf = require('pdf-creator-node');
const fs = require('fs');
const phantomjs = require('phantomjs-prebuilt');
const { nurseNoteFilePath } = require('../config');

const html = fs.readFileSync('src/template/nurse-note.html', 'utf8');

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm',
  phantomPath: phantomjs.path,
};

const nurseNotePdf = async (req, res) => {
  const { patient, notes } = req.body;
  const fileName = `nurse-note-${Date.now()}.pdf`;
  const document = {
    html,
    data: {
      patient,
      notes,
    },
    path: `${nurseNoteFilePath}/${fileName}`,
  };
  try {
    await pdf.create(document, options);
    res.status(201).send(fileName);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = nurseNotePdf;
