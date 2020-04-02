var bcrypt = require('bcryptjs');

exports.plainTextToHash = (plainText) => {
    const saltValue = global.ENV_DATA.bcrypt.salt;
    const salt = bcrypt.genSaltSync(saltValue);
    var hashString = bcrypt.hashSync(plainText, salt);
    return hashString;
}

exports.compareText = (plainText, hashString) => {
    return bcrypt.compareSync(plainText, hashString);
}