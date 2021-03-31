const multer = require('multer');
const  mimeType = require('mime-types');
// const  upload = multer({dest:'uploads/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mimeType.extension(file.mimetype) )
    }
})

module.exports = multer({ storage: storage })
