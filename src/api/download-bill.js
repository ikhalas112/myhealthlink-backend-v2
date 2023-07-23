const { billFilePath } = require('../config');

const downloadBill = (req, res) => {
  const path = req.params.path;
  try {
    if (!path) throw 'file not found';
    const file = `${billFilePath}/${path}`;
    res.download(file);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = downloadBill;
