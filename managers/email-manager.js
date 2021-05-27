const nodemailer = require('nodemailer');
const config = require('../configs/email')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.user, // generated ethereal user
        pass: config.pass, // generated ethereal password
    },
});
const email = (to,subject,html)=>{
     transporter.sendMail({
        from: '"Sunny school" <'+ config.user+'>',
        to: to,

        subject:subject,
        text: "Thanks for registration",
        html:html
    }).then(value => {
        console.log(value);
    });
}
module.exports = email;
