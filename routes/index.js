const  express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");
const responseHandler = require('../middlewares/response-handler');

router.get('/server/Homework/uploads/:image', responseHandler, (req,res)=>{
    if (req.params.image){
       const stream = fs.createReadStream(path.join(__homedir, 'Homework/uploads/', req.params.image));
       stream.on('error', (e)=>{
           res.onError(e)
       });
        stream.on('data', (chunk)=>{
            res.write(chunk)
        });
        stream.on('end', ()=>{
            res.end()
        });
    }
});
router.get('/', (req,res)=>{
    res.end('home page');
});
module.exports = router;
