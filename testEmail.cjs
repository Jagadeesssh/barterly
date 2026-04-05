require('dotenv').config({ path: 'C:/Users/arise/Downloads/e-commerce-website-development/backend/.env' });
const nodemailer = require('nodemailer');

async function test() {
  console.log("Starting SMTP test...");
  console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL ? "Exists" : "Missing");
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4,
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
    // Await verification with a 10s timeout
    const verifyPromise = transporter.verify();
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout after 10s")), 10000)
    );
    
    await Promise.race([verifyPromise, timeoutPromise]);
    console.log("Connection successful!");
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

test();
