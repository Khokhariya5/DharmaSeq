var jwt = require('jsonwebtoken');

exports.generateJwtToken = (payload) => {
   
    var result = new Date(new Date());
    result.setDate(result.getDate() + 30);
    payload.exp = result.getTime();
    
    const token = jwt.sign( payload, global.ENV_DATA.jwt.key, {
        algorithm: global.ENV_DATA.jwt.algo,
    })

    return token;
}