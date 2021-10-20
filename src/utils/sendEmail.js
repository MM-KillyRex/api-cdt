const moment = require('moment-timezone');
const { sendMail } = require('../services/mailer.service');

const generateHTML = async function (result) {
  
    
  const to = process.env.EMAIL_TO;
  const cc = process.env.EMAIL_CC;
  const subject = process.env.EMAIL_SUBJECT;
  const text = '';
  await sendMail(to, cc, subject, text, html);
};

module.exports = generateHTML;