const nodemailer = require('nodemailer');

const sendEmail = async (address, text, link) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: address, 
    subject: 'Hello ✔', 
    text, 
    html: '<a href="' + link + '">Link</a>', 
  });
};
module.exports = {
  sendEmail,
};
