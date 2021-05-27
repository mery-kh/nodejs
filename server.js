const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();
const cors = require('cors');
const io = require('./socket')
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/Homework', express.static('Homework'))
global.__homedir = __dirname;
router(app);
// const postsRouter = require('./routes/posts');
// const indexRouter = require('./routes/index')
// app.use(postsRouter);
// app.use(indexRouter);
// app.listen(2021);
//connect to db
mongoose.connect('mongodb://localhost/nodejs-sunny',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex: true
}).then(()=>{
   const server = http.createServer(app);
   server.listen(2021);
io(server)
});
