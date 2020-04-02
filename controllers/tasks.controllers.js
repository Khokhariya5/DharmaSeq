
//Helpers
const h_validators = require('../helpers/validators');
const h_jwt = require("../helpers/jwt");
const h_bcrypt  =  require("../helpers/crypt");

const db = require("../sequelize/index");
const Op = db.Sequelize.Op;

exports.test = (req,res)=>{
    res.send("sasd");
}

exports.addTask = async (req, res) => {
    
    var body = req.body;
    var params = req.query;

    if(!params.userId) return res.status(401).send({ error_code: "NOT_VALID", message: "userId not found." }).end();
    if(isNaN(params.userId)) return res.status(401).send({ error_code: "NOT_VALID", message: "Provide valide userId." }).end();

    let _userId = Number(params.userId);

    let taskJson = {
        userId: _userId || 0,
        description: body.description || "",
    }

    if(h_validators.isStrLenLessTo(taskJson.description, 2))
        return res.status(401).send({ success: false, error_code: "NOT_VALID", message: "Please Type Description." }).end();
    
    db.tasks.create(taskJson)
    .then(taskData => {
      return res.status(200).send({ success: true, data: { id: taskData.id } });
    })
    .catch(err => {
      return res.status(500).send({ success: false, message: "Some error occurred while creating the Task." });
  });

};

exports.getTaskByUserId = async (req, res) => {
    var params = req.query;

    if(!params.userId) return res.status(401).send({ error_code: "NOT_VALID", message: "userId not found." }).end();
    if(isNaN(params.userId)) return res.status(401).send({ error_code: "NOT_VALID", message: "Provide valide userId." }).end();

    let _userId = Number(params.userId);

    db.tasks.findAll({
        where: {
            userId: _userId
        }
    }).then(data => {
        
            return res.send({ success: true, data: data });
    }).catch(err => {
        return res.status(500).send({ success: false, message: "Some error occurred while fetching User Task." });
    });
}