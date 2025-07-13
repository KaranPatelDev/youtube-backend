import multer from 'multer';

// app.post('/profile', upload.single('avatar'), function (req, res, next) {}); // Here the "upload.single('avatar')" is the middleware that handles the file upload


const storage = multer.diskStorage({
  destination: function (req, file, cb/* Callback */) {
    cb(null, "../../public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now()) // Using original name with timestamp to avoid conflicts
  }
})

export const upload = multer({
    storage
})