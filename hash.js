// hashPassword.js
const bcrypt = require('bcrypt');
const password = 'password123'; // sample password

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
});
