
//Helpers
const h_validators = require('../helpers/validators');
const h_jwt = require("../helpers/jwt");
const h_bcrypt  =  require("../helpers/crypt");

const db = require("../sequelize/index");
const Op = db.Sequelize.Op;

exports.addUsers = async (req, res) => {
    
    var body = req.body;

    let userJson = {
        firstname: body.firstname || "",
        lastname: body.lastname || "",
        email: body.email || "",
        password: body.password || ""
    }

    if(h_validators.isStrLenLessTo(userJson.firstname, 2) && h_validators.isStrLenGreterTo(userJson.firstname, 20))
        return res.status(401).send({ error_code: "NOT_VALID", message: "firstname value must be string and length 3 to 20" }).end();
    if(h_validators.isStrLenLessTo(userJson.lastname, 2) && h_validators.isStrLenGreterTo(userJson.lastname, 20))
        return res.status(401).send({ error_code: "NOT_VALID", message: "lastname value must be string and length 3 to 20" }).end();
    if(!h_validators.checkObjectType(userJson.email, "string") || !h_validators.validateEmail(userJson.email))
        return res.status(401).send({ error_code: "NOT_VALID", message: "email is not valid." }).end();
    if(!h_validators.checkObjectType(userJson.password, "string") || h_validators.isStrLenGreterTo(userJson.password, 15) || h_validators.isStrLenLessTo(userJson.password, 4))
        return res.status(401).send({ error_code: "NOT_VALID", message: "password value  length 6 to 15" }).end();
    
        db.users.findAll({
        where: {
            email: body.email
        }
    }).then(data => {
        if(data && data.length > 0) return res.send({ success: false, message: "Email already exists." }).end();
        else{
            userJson.password = h_bcrypt.plainTextToHash(userJson.password);
            db.users.create(userJson)
            .then(userData => {
              return res.status(200).send({ success: true, data: { id: userData.id, email: userData.email } });
            })
            .catch(err => {
              return res.status(500).send({ success: false, message: "Some error occurred while creating the User." });
          });
        }
    }).catch(err => {
        return res.status(500).send({ success: false, message: "Some error occurred while checking the User." });
    });
    
};

exports.login = async (req, res) => {
    
    let userJson = {
        email: req.body.email || undefined,
        password: req.body.password || undefined,
    }

    if(!h_validators.checkObjectType(userJson.email, "string") && !h_validators.validateEmail(userJson.email))
        return res.status(401).send({ error_code: "NOT_VALID", message: "email is not valid." }).end();
    if(h_validators.isStrLenLessTo(userJson.password, 4) && h_validators.isStrLenGreterTo(userJson.password, 16))
        return res.status(401).send({ error_code: "NOT_VALID", message: "password value  length 6 to 15" }).end();

    db.users.findAll({
        where: {
           email: userJson.email
        }
    }).then(data => {

        if(data && data.length == 0) return res.send({ error_code: "AUTH", message: "Please enter valid email or password." }).end();
        else {
            let userDt = data[0];
            let isValidPassword = h_bcrypt.compareText(userJson.password, userDt.password);

            if(!isValidPassword) return res.status(401).send({ error_code: "AUTH", message: "Please enter valid email or password." }).end();
    
            let payload = {
                id: userDt.id.toString(),
                email: userDt.email
            }
    
            let authToken = h_jwt.generateJwtToken(payload);
    
            return res.status(200).send({ token: authToken }).end();
        }

    }).catch((err)=>{
        
        return res.status(500).send({ success: false, message: err.message +"-Some error occurred while checking the User." });

    })
    
};