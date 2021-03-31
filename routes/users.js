const  express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
// const multer = require('multer');
// const  mimeType = require('mime-types');
// // const  upload = multer({dest:'uploads/'});
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.' + mimeType.extension(file.mimetype) )
//     }
// })
//
// const upload = multer({ storage: storage })
// router.route('/').get((req,res)=>{
//     res.end(req.method + ' ' + new Date().toDateString());
// }).post((req,res)=>{
//     res.end(req.method + ' ' + new Date().toDateString());
// }).put((req,res)=>{
//     res.end(req.method + ' ' + new Date().toDateString());
// }).delete((req,res)=>{
//     res.end(req.method + ' ' + new Date().toDateString());
// });
router.route('/').get((req,res)=>{
    res.end('All users list');
}).post(upload.single('image'),(req,res)=>{
    res.status(400).json({
        success:true,
        data: req.file
    });
});
router.route('/:id').get((req,res)=>{
    res.end('return user data special');
}).put((req,res)=>{
    res.end('edit');
}).delete((req,res)=>{
    res.end(req.method + ' ' + new Date().toDateString());
});
module.exports = router;
