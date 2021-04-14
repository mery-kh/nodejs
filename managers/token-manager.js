const jwt = require('jsonwebtoken');
const config = require('../configs/jwt');
class TokenManager{
    static encode(data){
        return jwt.sign(data, config.privateKey,{
            expiresIn: 60 * 60 * 24  //1 day
        });
    }
    static async decode(token){
        return new Promise((resolve,reject) => {
            jwt.verify(token,config.privateKey,function (err, decoded){
                if(err){
                    return  reject(err)
                }
                resolve(decoded)
            })
        })
    }
}

// console.log(TokenManager.encode({username: 'Mery'}));
module.exports = TokenManager;
