const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimeType === "image/jpeg" || file.mimeType === "png") {
        callback(null, true)
    } else {
        callback(new Error("Unsupported file"), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

module.exports = {
    upload: upload
}