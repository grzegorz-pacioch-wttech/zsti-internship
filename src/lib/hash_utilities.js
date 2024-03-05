const {randomBytes, pbkdf2Sync} = require('node:crypto');

function Hash_Password(password)
{
    const salt = randomBytes(32).toString('hex');
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {salt: salt, hash: hash};
}

function Validate_Password(password, hash, salt)
{
    const hash_verify = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash != hash_verify;
}

module.exports.Validate_Password = Validate_Password;
module.exports.Hash_Password = Hash_Password;
