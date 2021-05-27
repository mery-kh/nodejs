const AppError = require('./managers/app-error')
const TokenManager = require("./managers/token-manager");
const MessagesController = require('./controllers/messagesController')
module.exports = (server) =>{
    const io = require('socket.io')(server, {
            cors: {
                origin : "http://localhost:63342",
                methods : ["GET", "POST"]
            }
        });
    const users = new Map()
    // const io = require('socket.io')(3000)
    io.use(async (client, next) => {
        if(client.handshake.auth.token){
            try {
                const decoded = await TokenManager.decode(client.handshake.auth.token);
                if(decoded.userId){
                    client.userId = decoded.userId;
                    next();
                }else{
                    new AppError('Auth Error', 401);
                }
            }catch (err){
                new AppError('Token not provided', 401);
            }
        }
        else{
            throw  new AppError('Token not provideddd', 401)
        }
    }).on('connection', (client) => {
        // client.emit('new message',client.userId);
        // client.on('new message1', (data) => {
        //     console.log(data);
        // })
        users.set(client.userId, client);
        client.on('disconnect',()=>{
            users.delete(client.userId)
        })
        client.on('messages', async (data)=>{
            const message = await MessagesController.getMessages({
                userId: client.userId,
                to: data.to
            })
            client.emit('messages', message)

        })
        client.on('new message',async (data)=>{
           const message = await MessagesController.send({
                userId: client.userId,
                to: data.to,
                value : data.value
            })
            if (users.has(data.to)){
                const receiver = users.get(data.to);
                receiver.emit('new message', message);
            }
        })
    });}

