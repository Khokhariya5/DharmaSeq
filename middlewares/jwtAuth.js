'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    var token = req.headers["x-access-token"];
    
    if (token) {

        try {

            var decoded = jwt.verify(token, global.ENV_DATA.jwt.key);
            
            if (decoded.exp <= new Date().getTime())
                return res.status(401).json({ 
                    error_code: 'TOKEN_EXPIRE', 
                    message: ""
                }).end();
            else {
                req.AuthUser = decoded.data;
                return next();
            }

        } catch (err) {
            return res.status(401).json({ 
                error_code: 'INVALID_TOKEN'
            }).end();
        }

    }
    else{
        return res.status(401).json({ 
            error_code: 'TOKEN_NOT_FOUND'
        }).end();
    }

}