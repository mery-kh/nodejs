const http = require('http');
const express = require('express');
const router = require('./router');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

router(app);
// const postsRouter = require('./routes/posts');
// const indexRouter = require('./routes/index')
// app.use(postsRouter);
// app.use(indexRouter);
// app.listen(2021);
http.createServer(app).listen(2021);
