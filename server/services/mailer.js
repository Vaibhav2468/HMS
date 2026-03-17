// services/mailer.js
import nodemailer from 'nodemailer';
import { config } from 'dotenv'
config({path:"./config/config.env"})


// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Load from environment
    pass: process.env.EMAIL_PASS,  // Load from environment
  },
});

// Function to send email
const sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); // Reject if there is an error
      } else {
        resolve(info); // Resolve with info if email is sent successfully
      }
    });
  });
};

export { sendEmail };
