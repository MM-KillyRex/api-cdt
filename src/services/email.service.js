const nodemailer = require('nodemailer');

const sendEmail = async () => { 
  const trasporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 465,
      secure: false,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
      },
  });

  const mailOptions = {
      from: process.env.EMIL_FROM,
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC,
      subject: process.env.EMAIL_SUBJECT,
      html: `<h1> Excel generado </h1>`,

      attachments: [
          {  
              filename: 'Excel.xlsx',
              path: 'Excel.xlsx',
          },
      ]

  };

  trasporter.sendMail(mailOptions, (error, info) => {
      if(error) {
          res.status(500).send(error.message);
      } else {
          console.log("Email Enviado!");
          res.status(200).jsonp(req.body);
      }
  });
}

module.exports = {
  sendEmail,
}


  