const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
const TokenManager = require('../managers/token-manager');
const UsersController = require('./usersController');
const email = require('../managers/email-manager');
class AuthController{
    async login(data){
        const {username, password} = data;
        const user = await UsersController.findOne({username });
        if(!user){
            throw new AppError('Username or password is wrong',403)
        }
        if(await Bcrypt.compare(password, user.password)){
            if (!user.isActive){
                throw new AppError('User profile is not active yet',403)
            }
            return TokenManager.encode({
                userId: user._id
            });
        }
        throw new AppError('Username or password is wrong',403)
    }
    async register(data){
        const user = await UsersController.add(data);
        const token = TokenManager.encode({
            email: user.email,
            action:'register'
        },3600); //1 hour
        email(user.email,'Node js register',`<a href="http://localhost:63342/nodejs-sunny/client/activate.html?activation-code=${token}&_ijt=hmfptea2paon837lmpfv4e4ela">Activate profile</a>`);
        return user;
    }

    async activate(token){
       const decoded = await TokenManager.decode(token);
       if(decoded.email && decoded.action === 'register'){
           const user = await UsersController.findOne({email:decoded.email});
           console.log(user)
           if(!user || user.isActive){
               throw new AppError('Invalid code',403);
           }
           user.isActive = true;
           return user.save();
       }
        throw new AppError('Invalid code2',404);
    }
    async forgotPassword(data){
        const user = await UsersController.findOne({email: data.email});
        if(!user){
            throw new AppError("User not found",403);
        }
        const token = TokenManager.encode({
            email: user.email,
            action:'forgot'
        },3600); //1 hour
        await email(user.email,'Node js reset password',`<a href="http://localhost:63342/nodejs-sunny/client/reset-password.html?reset-code=${token}&_ijt=hmfptea2paon837lmpfv4e4ela">Reset Password</a>`);
    }

    async resetPassword(data){
        const decoded = await TokenManager.decode(data.code);
        if(decoded.email && decoded.action === 'forgot'){
            const user = await UsersController.findOne({email:decoded.email});
            console.log(user)
            if(!user){
                throw new AppError('Invalid code',403);
            }
            user.password = await Bcrypt.hash(data.password);
            return user.save();
        }
        throw new AppError('Invalid code2',404);
    }
}
module.exports = new AuthController();
