const  express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const validationResult = require('../middlewares/validation-result');
const responseHandler = require('../middlewares/response-handler');
const AuthController = require('../controllers/authController.js');
const upload = require('../middlewares/upload');
const path = require('path')
const fs = require('fs');
router.post('/login',
    body('username').exists(),
    body('password').exists(),
    responseHandler,
    validationResult,
    async (req,res) => {
        try{
            const token = await AuthController.login({
                ...req.body
            })
            res.onSuccess(token);
        }
        catch (err){
            res.onError(err)
        }
    }
);
router.post('/register', upload.single('file'),
    body('name').exists().bail().isLength({min:6}),
    body('email').isEmail(),
    body('password').exists().bail().isLength({min:6}).custom(value =>{
        return new RegExp("^[A-Z0-9.,/ $@()]+$").test(value);
    }),
    responseHandler,
    validationResult,
    async (req,res)=>{
        try {
            let userdata = await AuthController.register({
                email:req.body.email,
                name:req.body.name,
                username: req.body.username,
                file: req.file,
                password: req.body.password
            });
            userdata = userdata.toObject();
            delete userdata.password;
         res.onSuccess(userdata, 'User Created');
        }
        catch (err){
            // await fs.exists("/path/to/file",function(exists){
                  fs.unlink(path.join(__homedir, req.file.path),err => {
                      if (err) {
                          console.log("error deleting file " + err)}}
                  );
            // });

            res.onError(err);
        }
    });

router.get('/activate',
    query('code').exists(),
    responseHandler,
    validationResult,
    async (req,res) => {
        try{
            const token = await AuthController.activate(req.query.code);
            res.onSuccess(token);
        }
        catch (err){
            res.onError(err)
        }
    }
);
router.post('/forgot-password',
    body('email').isEmail(),
    responseHandler,
    validationResult,
    async (req,res) => {
        try{
            await AuthController.forgotPassword({
                email: req.body.email
            })
            res.onSuccess({} ,'Email Sent');
        }
        catch (err){
            res.onError(err)
        }
    }
);
router.post('/reset-password',
    query('code').exists(),
    body('password').exists(),
    responseHandler,
    validationResult,
    async (req,res) => {
        try{
            const token = await AuthController.resetPassword({
                code: req.query.code,
                password: req.body.password
            });
            res.onSuccess({},'Password changed');
        }
        catch (err){
            res.onError(err)
        }
    }
);
module.exports = router;
