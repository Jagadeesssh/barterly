const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    family: 4, // Force IPv4
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Add a 10 second timeout so the backend never hangs indefinitely!
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Email server timed out. Gmail might be blocking your Render IP.')), 10000)
  );

  await Promise.race([
    transporter.sendMail(mailOptions),
    timeoutPromise
  ]);
};

module.exports = sendEmail;
