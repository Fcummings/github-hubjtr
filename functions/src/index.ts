import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

const createWelcomeEmailTemplate = (userEmail: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CLKK</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      border-radius: 8px 8px 0 0;
    }
    
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      text-decoration: none;
    }
    
    .content {
      padding: 30px;
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0 0 8px 8px;
    }
    
    .feature {
      margin: 20px 0;
      padding: 15px;
      background-color: #f9fafb;
      border-radius: 6px;
    }
    
    .feature-title {
      color: #3B82F6;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    
    .cta-button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      color: #ffffff;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      margin: 20px 0;
    }
    
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-link {
      color: #3B82F6;
      text-decoration: none;
      margin: 0 10px;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        padding: 10px !important;
      }
      
      .content {
        padding: 20px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">CLKK</div>
    </div>
    
    <div class="content">
      <h1>Welcome to CLKK! 🎉</h1>
      <p>Hi ${userEmail.split('@')[0]},</p>
      
      <p>Thank you for joining CLKK! We're thrilled to have you on board. Your account has been successfully verified, and you're now part of our exclusive waitlist.</p>
      
      <div class="feature">
        <h3 class="feature-title">What's Next?</h3>
        <p>We're working hard to revolutionize the payment experience. Here's what you can expect:</p>
        <ul>
          <li>Early access to our platform</li>
          <li>Exclusive updates on our launch</li>
          <li>Special perks for waitlist members</li>
        </ul>
      </div>
      
      <div class="feature">
        <h3 class="feature-title">Key Features You'll Love</h3>
        <ul>
          <li>⚡️ Instant Transactions</li>
          <li>🤝 Seamless Peer-to-Peer Payments</li>
          <li>🔒 Enhanced Security</li>
        </ul>
      </div>
      
      <a href="https://clkk.app/dashboard" class="cta-button">
        Visit Your Dashboard
      </a>
      
      <p>If you have any questions or need assistance, our support team is here to help. Just reply to this email!</p>
      
      <p>Best regards,<br>The CLKK Team</p>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="https://twitter.com/clkkapp" class="social-link">Twitter</a>
        <a href="https://facebook.com/clkkapp" class="social-link">Facebook</a>
        <a href="https://instagram.com/clkkapp" class="social-link">Instagram</a>
      </div>
      
      <p>© 2024 CLKK. All rights reserved.</p>
      <p>123 Payment Street, Fintech City, FC 12345</p>
      
      <p style="font-size: 12px; color: #9ca3af;">
        You're receiving this email because you signed up for CLKK.
        If you believe this is a mistake, please ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
`;

export const sendWelcomeEmail = functions.firestore
  .document('waitlist/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const userEmail = userData.email;

    const mailOptions = {
      from: '"CLKK Team" <noreply@clkk.app>',
      to: userEmail,
      subject: 'Welcome to CLKK! 🎉',
      html: createWelcomeEmailTemplate(userEmail)
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully to:', userEmail);
      
      // Update the document to mark email as sent
      await snap.ref.update({
        welcomeEmailSent: true,
        welcomeEmailSentAt: new Date()
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new functions.https.HttpsError('internal', 'Failed to send welcome email');
    }
  });