const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const NodeRSA = require('node-rsa');

const app = express();

// Helmet
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

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

// Route to generate RSA key pair
app.post('/generate-key-pair', (req, res) => {
  const keyLength = parseInt(req.body.keyLength, 10);
  const key = new NodeRSA({ b: keyLength });

  const privateKey = key.exportKey('private');
  const publicKey = key.exportKey('public');

  res.send({ privateKey, publicKey });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
