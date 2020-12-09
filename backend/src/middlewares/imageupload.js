const multer = require('multer')
const path = require('path')
const createError = require('http-errors')
const uuid4 = require('uuid').v4
const fs = require('fs')

const imageUpload = {}

// General storage of uploads.
const storage = multer.diskStorage({
  destination: path.join('uploads/'),
  filename: function (req, file, cb) {
    const fullName = 'product_' + uuid4().replace(/-/g, '') +
      path.extname(file.originalname).toLowerCase()
    cb(null, fullName)
  }
})

// Multer object for product
const productUpload = multer({
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
      cb(createError(400, 'Only jpeg, jpg and png images allowed.'))
    }
  }
}).any()

// product image uploader with error handling?
imageUpload.product = function (req, res, next) {
  productUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_COUNT') {
        return next(createError(400, 'Too many files!'))
      }
      // console.dir(err) // How to determine different errors?
      next(createError(400, 'Bad files!'))
    } else {
      next(err)
    }
  })
}

imageUpload.errorHandler = function (err, req, res, next) {
  if (req.files) {
    req.files.forEach(file => fs.unlinkSync(file.path))
  }
  next(err)
}

module.exports = imageUpload
