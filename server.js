const http = require('http');
const { URL } = require('url');
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

// Test SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection failed:', error.message);
  } else {
    console.log('✓ SMTP Connection successful - ready to send emails');
  }
});

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost');

  // Enable CORS for frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/contact') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const targetEmail = data.to_email || TO_EMAIL;
        const subject = `coffee Den reservation request from ${data.email || 'unknown'}`;
        const text = `Date: ${data.date || 'N/A'}\nTime: ${data.time || 'N/A'}\nEmail: ${data.email || 'N/A'}`;

        // Send to target email and admin (if different)
        const recipients = [targetEmail];
        if (targetEmail !== TO_EMAIL) recipients.push(TO_EMAIL);

        await transporter.sendMail({
          from: SMTP_USER,
          to: recipients.join(','),
          subject,
          text,
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: error.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/newsletter') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const targetEmail = data.to_email || TO_EMAIL;
        const subject = 'coffee Den newsletter signup';
        const text = `Email: ${data.email || 'N/A'}`;

        console.log(`[newsletter] Sending to: ${targetEmail}, from: ${data.email}`);

        // Send to target email and admin (if different)
        const recipients = [targetEmail];
        if (targetEmail !== TO_EMAIL) recipients.push(TO_EMAIL);

        await transporter.sendMail({
          from: SMTP_USER,
          to: recipients.join(','),
          subject,
          text,
        });

        console.log(`[newsletter] ✓ Email sent successfully`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (error) {
        console.error(`[newsletter] ✗ Error:`, error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: error.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'Not found' }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`coffee Den mail server listening on http://localhost:${PORT}`);
});
