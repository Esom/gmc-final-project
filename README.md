# Text Encryption/Decryption and RSA Key Generation App

This is a simple web application that allows users to input text, submit it, and see the encrypted/decrypted value using the AES-256-CBC algorithm. Additionally, it provides functionality to generate RSA key pairs (public and private keys).

## Features

- Encrypt/Decrypt text using AES-256-CBC.
- Display the encrypted/decrypted text on the web page.
- Generate RSA key pairs (public and private keys).
- Display the generated RSA keys on the web page.
- Responsive design with basic styling.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Esom/gmc-final-project.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    node server.js
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### Text Encryption/Decryption

1. Enter the text you want to encrypt in the input field and click the "Encrypt" button. The encrypted text will be displayed below.
2. Enter the encrypted text you want to decrypt in the input field and click the "Decrypt" button. The decrypted text will be displayed below.

### RSA Key Generation

1. Select the desired key length from the dropdown menu (1024, 2048, or 4096).
2. Click the "Generate key pair" button. The generated RSA private and public keys will be displayed in the respective text areas.

## Public URL

https://gmc-final-project.onrender.com/
