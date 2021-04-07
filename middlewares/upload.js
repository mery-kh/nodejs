const multer = require('multer');
const  mimeType = require('mime-types');
const random = require('random');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Homework/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,random.int(100000,999999) + '.' + mimeType.extension(file.mimetype) )
    }
})
module.exports = multer({ storage: storage })
