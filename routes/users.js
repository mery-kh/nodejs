const  express = require('express');
const router = express.Router();
router.route('/').get((req,res)=>{
    res.end('Method GET at ' + new Date().getHours() + ':'+ new Date().getMinutes()+ ':' + new Date().getMinutes());
}).post((req,res)=>{
    res.end('Method POST at '+ new Date().getHours() + ':'+ new Date().getMinutes()+ ':' + new Date().getMinutes());
}).put((req,res)=>{
    res.end('Method PUT at '+ new Date().getHours() + ':'+ new Date().getMinutes()+ ':' + new Date().getMinutes());
}).delete((req,res)=>{
    res.end('Method DELETE at '+ new Date().getHours() + ':'+ new Date().getMinutes()+ ':' + new Date().getMinutes());
});

module.exports = router;
