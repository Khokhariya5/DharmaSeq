const express = require('express');
const router = express.Router();

const jwtAuth = require("../middlewares/jwtAuth");

const tasksController = require('../controllers/tasks.controllers');


router.post('/create', jwtAuth, tasksController.addTask);

router.get('/user', jwtAuth, tasksController.getTaskByUserId);

module.exports = router