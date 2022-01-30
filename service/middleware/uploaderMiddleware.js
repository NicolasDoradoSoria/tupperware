const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const storage = multer.diskStorage({

  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `${shortid.generate()}.${extension}`);
  },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato No válido'))
    }
  }
})
exports.uploadSingle =  multer({ storage, dest: path.join(__dirname, 'uploads') }).single("photoURL")

exports.uploadMulti =  multer({ storage, dest: path.join(__dirname, 'uploads') }).array("files")
