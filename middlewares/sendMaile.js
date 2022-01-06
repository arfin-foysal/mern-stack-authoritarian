const nodemailer = require("nodemailer");
module.exports = async (email, subject, Link) => {
    try {
        let transporter = nodemailer.createTransport({
            // host: smtp.gmail.com,
            service:process.env.SERVICE,
            port: 587,
            secure: false,
            auth: {
              user: process.env.USER, // generated ethereal user
              pass: process.env.pass, // generated ethereal password
            },
        });

       await transporter.sendMail({
            from:process.env.USER,
            to: email, // list of receivers
            subject: subject, // Subject line
            text:Link, // plain text body
           html: `
           <a href=${Link}>click</a>
            `, // html body
        });
        
    } catch (error) {
        console.log(error,"email Not Send");
    }
}