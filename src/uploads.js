const path = require('path');
const multer = require('multer');

const MULTER_CFG = {
  dest: path.join(__dirname, '../public/uploads'),
};

const uploads = () => {
  const upload = multer(MULTER_CFG);
  return upload.single('fileups');
};

module.exports = uploads;
