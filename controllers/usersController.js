const User = require('../models/users');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
const TokenManager = require('../managers/token-manager')
class UsersController{
    getById(id){
        return User.findById(id);
    }
    async getAllUsers(data){
        const options = {};
        const limit = {};
        if (data.name) {
            options.name = data.name;
        }

        if (data.limit) {
            limit.limit = Number(data.limit);
        }

        // const users = await User.find(options, null, limit);
        // res.json({
        //     success: true,
        //     data: users
        // });
        return User.find(options, null, limit);
    }
    async add(data){
        if (await User.exists({username:data.username})) { //or Users.exists
            throw new Error('User Exists')
        } else {
            // const users = JSON.parse(await fs.readFile(usersJsonPath, 'utf8'));
            const user = new User({
                name: data.name,
                image: data.file.path,
                password: await Bcrypt.hash(data.password)
            });
            user.username = data.username;
            return user.save();
            // res.json({
            //     success: true,
            //     data: user,
            //     message: 'User is created'
            // });
        }
    }
    async login(data){
        const {username, password} = data;
        const user = await User.findOne({username });
        if(!user){
            throw new AppError('Username or password is wrong',403)
        }
        if(await Bcrypt.compare(password, user.password)){
            return TokenManager.encode({
                userId: user._id
            });
        }
        throw new AppError('Username or password is wrong',403)
    }
    update(){

    }
    delete(){

    }
}
module.exports = new UsersController();
