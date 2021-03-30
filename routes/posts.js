const  express = require('express');
const router = express.Router();
router.route('/').get((req,res)=>{
    res.end('Method GET');
}).post((req,res)=>{
    res.end('Method POST');
});
router.route('/:id').get((req,res)=>{
    console.log(req.params);
    res.end('Method GET');
}).delete((req,res)=>{
    res.end('Method DELETE');
});
module.exports = router;
