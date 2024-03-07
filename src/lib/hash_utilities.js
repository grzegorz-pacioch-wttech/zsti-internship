const {randomBytes, pbkdf2Sync} = require('node:crypto');

module.exports.Validate_Password = (password) => {
    const salt = randomBytes(32).toString('hex');
    const hash = pbkdf2Sync(password.trim(), salt, 10000, 64, 'sha512').toString('hex');

    return {salt: salt, hash: hash};
}

module.exports.Hash_Password = (password, hash, salt) => {
    const hash_verify = pbkdf2Sync(password.trim(), salt, 10000, 64, 'sha512').toString('hex');
    return hash != hash_verify;
}

