const crypto = require('crypto');
const readline = require('readline');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Secret key
const iv = crypto.randomBytes(16);  // Initialization vector

/**
 * Encrypts text using AES-256-CBC algorithm
 * @param {string} text - Plain text to be encrypted
 * @returns {string} Encrypted text (ciphertext)
 */
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts text using AES-256-CBC algorithm
 * @param {string} text - Encrypted text (ciphertext) to be decrypted
 * @returns {string} Decrypted plain text
 */
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input
rl.question('Please enter the text to be encrypted: ', (plaintext) => {
  const encryptedText = encrypt(plaintext);
  const decryptedText = decrypt(encryptedText);

  console.log('Plaintext:', plaintext);
  console.log('Encrypted:', encryptedText);
  console.log('Decrypted:', decryptedText);

  // Close readline interface
  rl.close();
});


// To run this code
// 1. Open a terminal and navigate to the directory containing the file
// 2. Run 'node AES-256-CBC.js'
