const encryptLoader = document.getElementById('encryptLoader');
const decryptLoader = document.getElementById('decryptLoader');
const rsaLoader = document.getElementById('rsaLoader');
const outputText = document.getElementById('outputText');

function showLoader(loader) {
  loader.style.display = 'block';
  outputText.style.display = 'none';
}

function hideLoader(loader) {
  loader.style.display = 'none';
}

function showOutput(text) {
  outputText.style.display = 'block';
  outputText.innerText = text;
}

document.getElementById('encryptBtn').addEventListener('click', function() {
  const text = document.getElementById('text').value;
  showLoader(encryptLoader);

  fetch('/encrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `text=${text}`
  })
  .then(response => response.json())
  .then(data => {
    hideLoader(encryptLoader);
    showOutput(`Encrypted: ${data.encryptedText}`);
  })
  .catch(error => {
    hideLoader(encryptLoader);
    console.error('Error:', error);
  });
});

document.getElementById('decryptBtn').addEventListener('click', function() {
  const encryptedText = document.getElementById('encrypted').value;
  showLoader(decryptLoader);

  fetch('/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `encrypted=${encryptedText}`
  })
  .then(response => response.json())
  .then(data => {
    hideLoader(decryptLoader);
    showOutput(`Decrypted: ${data.decryptedText}`);
  })
  .catch(error => {
    hideLoader(decryptLoader);
    console.error('Error:', error);
  });
});

document.getElementById('generateKeyPairBtn').addEventListener('click', function() {
  const keyLength = document.getElementById('keyLength').value;
  showLoader(rsaLoader);

  fetch('/generate-key-pair', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `keyLength=${keyLength}`
  })
  .then(response => response.json())
  .then(data => {
    hideLoader(rsaLoader);
    document.getElementById('privateKey').value = data.privateKey;
    document.getElementById('publicKey').value = data.publicKey;
  })
  .catch(error => {
    hideLoader(rsaLoader);
    console.error('Error:', error);
  });
});
