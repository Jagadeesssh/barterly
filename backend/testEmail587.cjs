require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
  console.log("Starting SMTP test on 587...");
  console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL ? process.env.SMTP_EMAIL : "Missing");
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log("Attempting to verify connection...");
    
    // Test verification
    await transporter.verify();
    console.log("Connection successful on port 587!");
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

test();
