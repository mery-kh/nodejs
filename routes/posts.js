const  express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Users = require('../models/users');
const {body,check} = require('express-validator');
const {ObjectId} = require('mongoose').Types;
const ResponseManager = require('../managers/response-manager');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');
const PostsController = require('../controllers/postsController');
const responseHandler = require('../middlewares/response-handler');
const validateToken = require('../middlewares/validate-token')
router.route('/').get(    responseHandler,
    async (req,res)=>{
    // const responseHandler = ResponseManager.getResponseHandler(res);
    // const posts = await  Posts.find().populate('author');
   // res.json(posts);
   try{
       const posts = await PostsController.getAllPosts();
       res.onSuccess(posts,'All posts');
   }
   catch (err){
       res.onError(err);
   }
}).post(
    responseHandler,
    validateToken,
    // body('userId').custom((value,{req,res})=>{
    //     return ObjectId.isValid(value);
    // }),
    check('title','title doesnt exist').exists(),
    validationResult,
    async (req,res)=>{
        // const responseHandler = ResponseManager.getResponseHandler(res);

        // const errors = validationResult(req);
        // if(!errors.isEmpty()){
        //    return responseHandler.onError(new AppError('Validation Error',400), errors.array());
        //     // return res.status(400).json({errors:errors.mapped()});
        // }

    try{
        // const user = await Users.findById(req.body.userId);
        // if(!user){
        //     //error user not found
        // }
        // const post = await new Posts({
        //     title: req.body.title,
        //     description: req.body.description,
        //     author: user._id
        // }).save();
        const post = await PostsController.add({
            title:req.body.title,
            description: req.body.description,
            author: req.body.author
        });
        //call controller function
        res.onSuccess(post,'Post created');
    }
    catch (err){
        res.onError(err);
    }
    res.json({
        success: true,
        data: post,
        message: 'post created'
    });
    //     responseHandler.onSuccess(post,'Post created')
});
router.route('/:id').get((req,res)=>{
    console.log(req.params);
    res.end('Method GET');
}).delete((req,res)=>{
    res.end('Method DELETE');
});
module.exports = router;
