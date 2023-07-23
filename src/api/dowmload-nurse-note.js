const { nurseNoteFilePath } = require('../config');

const downloadNurseNote = (req, res) => {
  const path = req.params.path;
  try {
    if (!path) throw 'file not found';
    const file = `${nurseNoteFilePath}/${path}`;
    res.download(file);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = downloadNurseNote;
