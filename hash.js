const bcrypt = require('bcrypt');
const btoa = require('btoa'); // npm install btoa if you don't have it
const password = 'password123'; // sample password

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log('Hashed Password:', hash);
    const base64Encoded = btoa(hash);
    console.log('Base64 Encoded Hashed Password:', base64Encoded);
});

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log('COOKIE:', secret);