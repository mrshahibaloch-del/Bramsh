const nodemailer = require('nodemailer');

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;
const SMTP_USER = 'mrshahibaloch@gmail.com';
const SMTP_PASS = 'rgqh hofs kwmo narj';
const TO_EMAIL = 'mrshahibaloch@gmail.com';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { email, to_email } = req.body;
    const targetEmail = to_email || TO_EMAIL;
    const subject = 'coffee Den newsletter signup';
    const text = `Email: ${email || 'N/A'}`;

    console.log(`[newsletter] Sending to: ${targetEmail}, from: ${email}`);

    // Send to target email and admin (if different)
    const recipients = [targetEmail];
    if (targetEmail !== TO_EMAIL) recipients.push(TO_EMAIL);

    await transporter.sendMail({
      from: SMTP_USER,
      to: recipients.join(','),
      subject,
      text,
    });

    console.log(`[newsletter] ✓ Email sent successfully to ${recipients.join(', ')}`);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[newsletter] ❌ Error:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
}
