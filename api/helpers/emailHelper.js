const MailGun = require('mailgun-js');

const sendEmail = async (address, text, link) => {
  let mailGun = new MailGun({
    apiKey: process.env.EMAIL_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  });
  
  let mailOptions = {
    from: `Project-x <${process.env.EMAIL_USERNAME}>`,
    to: address,
    subject: "Reset Password!",
    text,
    html: '<a href="' + link + '">Link</a>', 
  };

  let answer = await mailGun.messages().send(mailOptions);

  return answer;
};
module.exports = {
  sendEmail,
};
