const  express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const fs = require('fs/promises');
const path = require('path');
const usersJsonPath = path.join(__homedir,'./users.json');
const User = require('../models/users');
const UsersController = require('../controllers/usersController')
const {body, check} = require('express-validator');
const responseHandler = require('../middlewares/response-handler');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');
const validateToken = require('../middlewares/validate-token')
router.route('/').get(
    responseHandler,
    validateToken,
    async (req,res)=>{
    // let users = Object.values(JSON.parse(await fs.readFile(usersJsonPath, 'utf8')));
    // if(req.query.name){
    //     users = users.filter(user => user.name.includes(req.query.name))
    // }
    // if(req.query.limit){
    //     users = users.slice(0,Number(req.query.limit))
    // }
    // res.json({
    //     success: true,
    //     data: users
    // });


    // const options = {};
    // const limit = {};
    // if (req.query.name) {
    //     options.name = req.query.name;
    // }
    //
    // if (req.query.limit) {
    //     limit.limit = Number(req.query.limit);
    // }
    //
    // const users = await User.find(options, null, limit);
    // res.json({
    //     success: true,
    //     data: users
    // });
    // const responseHandler = ResponseManager.getResponseHandler(res);
    try{
        const users = await UsersController.getAllUsers({
            name: req.query.name,
            userId: req.decoded.userId,
            limit:req.query.limit
        });
        res.onSuccess(users,'All posts');
    }
    catch (err){
        res.onError(err);
    }
})
//     .post(upload.single('image'),
//     body('name').exists().bail().isLength({min:6}),
//     body('password').exists().bail().isLength({min:6}).custom(value =>{
//         return new RegExp("^[A-Z0-9.,/ $@()]+$").test(value);
//     }),
//     responseHandler,
//     validationResult,
//     async (req,res)=>{
//     // const errors = validationResult(req);
//     // if(!errors.isEmpty()){
//     //     return res.status(400).json({errors:errors.array()});
//     // }
//     //     const responseHandler = ResponseManager.getResponseHandler(res);
//
//         try {
//         // const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf8'));
//         // if (users[req.body.username]) {
//         //     // await fs.unlink(path.join(__homedir, req.file.path));
//         //     // res.status(400).json({
//         //     //     success: false,
//         //     //     data: null,
//         //     //     message: 'Username is taken'
//         //     // })
//         //     throw new Error('Username is taken')
//         // } else {
//         //     users[req.body.username] = {
//         //         username: req.body.username,
//         //         name: req.body.name,
//         //         image: req.file.path
//         //     }
//         //     await fs.writeFile(usersJsonPath, JSON.stringify(users));
//         //     res.json({
//         //         success: true,
//         //         data: users[req.body.username],
//         //         message: 'User is created'
//         //     });
//         // }
//         let userdata = await UsersController.add({
//             name:req.body.name,
//             username: req.body.username,
//             file: req.file,
//             password: req.body.password
//         });
//         // userdata = userdata.toObject();
//         // delete userdata.password;
//
//         // res.json({
//         //     success: true,
//         //     data:userdata,
//         //     message: 'user created'
//         // });
//             res.onSuccess(userdata);
//
//         }
//     catch (err){
//         await fs.unlink(path.join(__homedir, req.file.path));
//         // res.json({
//         //     success: false,
//         //     data: null,
//         //     message: err.message
//         // })
//         res.onError(err);
//
//     }
// });
// router.post('/login',
//     body('username').exists(),
//     body('password').exists(),
//     responseHandler,
//     validationResult,
//     async (req,res) => {
//         try{
//             const token = await UsersController.login({
//                 ...req.body
//             })
//             res.onSuccess(token);
//         }
//         catch (err){
//             res.onError(err)
//         }
//     }
//     );
router.route('/friends').get(
    responseHandler,
    validateToken,
    async (req,res)=>{
        try{
           const friends = await UsersController.getFriends({
                userId: req.decoded.userId
            })
            res.onSuccess(friends);
        }
        catch (err){
            res.onError(err)
        }
    }
);
router.route('/friend-request').post(
    responseHandler,
    body('to').exists(),
    validateToken,
    async (req,res)=>{
        try{
            await UsersController.friendRequest({
                from: req.decoded.userId,
                to: req.body.to,
            });
            res.onSuccess();
        }
        catch (err){
            res.onError(err)
        }
    }
).get(
    responseHandler,
    validateToken,
    async (req,res)=>{
        try{
            res.onSuccess(
                await UsersController.getFriendRequests({
                    userId: req.decoded.userId
                })
            );
        }
        catch (err){
            res.onError(err)
        }
    }
).put(
    responseHandler,
    body('to').exists(),
    validateToken,
    async (req, res) => {
        try {
            await UsersController.acceptFriendRequest({
                userId: req.decoded.userId,
                to: req.body.to
            });
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
).delete(
    responseHandler,
    body('to').exists(),
    validateToken,
    async (req, res) => {
        try {
            await UsersController.declineFriendRequest({
                userId: req.decoded.userId,
                to: req.body.to
            });
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
)
router.route('/current').get(
    responseHandler,
    validateToken,
    async (req,res) => {
        try{
            const user = await UsersController.getById(req.decoded.userId);
            res.onSuccess(user);
        }
        catch (err){
            res.onError(err)
        }
    }
).put(
    upload.single('image'),
    responseHandler,
    validateToken,
    body('name').exists().bail().isLength({min: 6}),
    body('password').exists().bail().isLength({min:6}).custom(value =>{
        return new RegExp("^[A-Z0-9.,/ $@()]+$").test(value);
    }),
    async (req, res)=>{
        try {
            const updatedData = await UsersController.update({
                name: req.body.name,
                email: req.body.email,
                image: req.file ? req.file.filename : undefined,
                userId: req.decoded.userId
            });
            res.onSuccess(updatedData);
        }
        catch (err){
            if(req.file && req.file.path){
                await fs.promises.unlink(path.join(__homedir, req.file.path))
            }
            res.onError(err);
        }
    })
router.route('/:username').get(async (req,res)=> {
    const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf8'));
    try {
        if (!users[req.params.username]) {
            throw new Error('Username doesnt exist')
        } else {
            res.json({
                success: true,
                data: users[req.params.username],
                message: 'User is found'
            });
        }
    }
    catch (err){
        res.json({
            success: false,
            data: null,
            message: err.message
        })
    }
}).put(upload.single('image'), async (req, res) => {
    try {
        const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf8'));
        const user = users[req.params.username];
        if (user) {
            await fs.unlink(path.join(__homedir,user['image']));
            user.name = req.body.name;
            user.image = req.file.path;
            await fs.writeFile(usersJsonPath,JSON.stringify(users));
            res.json({
                success: true,
                data: user,
                message: 'user updated'
            });
        } else {
            throw new Error('User not found');
        }
    } catch (e) {
        await fs.unlink(path.join(__homedir, req.file.path));
        res.json({
            success: false,
            data: null,
            message: e.message
        });
    }
}).delete(async (req,res)=> {
    const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf8'));
    if (users[req.params.username]) {
        delete users[req.params.username];
        await fs.writeFile(usersJsonPath, JSON.stringify(users));
        res.json({
            success: true,
            data: users[req.params.username],
            message: 'User deleted'
        });
    }
    else {
        res.json({
            success: false,
            message: 'User doesnt exist'
        });
    }
});

module.exports = router;

