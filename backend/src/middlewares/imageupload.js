const multer = require('multer')
const imageUpload = {}
const path = require('path')
const uuid4 = require('uuid').v4

// General storage of uploads.
const storage = multer.diskStorage({
  destination: path.join('uploads/'),
  filename: function (req, file, cb) {
    const fullName = 'product_' + uuid4().replace(/-/g, '') +
      path.extname(file.originalname).toLowerCase()
    cb(null, fullName)
  }
})

// Upload middleware for product.
imageUpload.product = multer({
  storage: storage,
  limits: { fileSize: 2000000, files: 3 },
  fileFilter: function (req, file, cb) {
    const fileTypes = /png|jpeg|jpg/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    file.originalname.toLowerCase()
    const mimeType = fileTypes.test(file.mimetype)
    if (extName && mimeType) {
      cb(null, true)
    } else {
      cb(new Error('Only png, jpeg, and jpg are allowed!'))
    }
  }
})

module.exports = imageUpload
