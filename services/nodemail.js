const nodemailer = require("nodemailer");

const sendEmailPass = async (email, subject, text, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  let result = await transporter.sendMail({
    from: '"workroom-naumenko.cc" <teatchertrud@gmail.com>',
    to: email,
    subject: subject,
    text: text,
    html: text,
  });

  // console.log(result);
};

module.exports = sendEmailPass;
