const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Encrypt function
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt function
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Route to encrypt text
app.post('/encrypt', (req, res) => {
  const plaintext = req.body.text;
  const encryptedText = encrypt(plaintext);
  res.send({ encryptedText });
});

// Route to decrypt text
app.post('/decrypt', (req, res) => {
  const encryptedText = req.body.encrypted;
  const decryptedText = decrypt(encryptedText);
  res.send({ decryptedText });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
