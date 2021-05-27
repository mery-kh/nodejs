module.exports = (app) => {
    app.use('/posts', require('./routes/posts'));
    app.use('/users', require('./routes/users'));
    app.use('/auth', require('./routes/auth'));
    app.use('/', require('./routes/index'));
};
