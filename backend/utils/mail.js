const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendMail = async (to, sub, msg) => {
  try {
    console.log("Preparing to send email...");
    console.log(`To: ${to.email}`);
    console.log(`Subject: ${sub}`);
    console.log(`Message: ${msg}`);
    await transporter.sendMail({
      to: to.email,
      subject: sub,
      html: msg,
    });
    console.log("Mail Sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
