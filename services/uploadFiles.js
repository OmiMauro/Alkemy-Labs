import multer, { diskStorage } from 'multer'

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})
/* const uploadFile = multer({
  dest: 'public/uploads/images/',
  preservePath: true
}) */
const uploadFile = multer({ storage })

export { uploadFile }
