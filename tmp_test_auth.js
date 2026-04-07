const http = require('http');
const data = JSON.stringify({ email: 'test@test.com', password: 'test' });
const req = http.request(
  'http://localhost:3001/api/auth/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  },
  (res) => {
    console.log('status', res.statusCode);
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log('body', body);
    });
  }
);
req.on('error', (err) => console.error('error', err));
req.write(data);
req.end();
