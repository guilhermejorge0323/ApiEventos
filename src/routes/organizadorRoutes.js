const express = require('express');
const OrganizadorController = require('../controllers/OrganizadorController');


const router = express.Router();
const organizadorController = new OrganizadorController();


router.get('/organizador', (req, res, next) => organizadorController.getOrganizadoresAtivos(req, res, next));
router.get('/organizador/inativo', (req, res, next) => organizadorController.getOrganizadoresInativos(req, res, next));
router.get('/organizador/todos', (req, res, next) => organizadorController.getAllRegisters(req, res, next));
router.get('/organizador/:id', (req, res, next) => organizadorController.getRegisterById(req, res,next));
router.post('/organizador', (req, res, next) => organizadorController.postRegister(req, res, next));
router.put('/organizador/:id', (req, res, next) => organizadorController.putRegister(req, res, next));
router.delete('/organizador/:id', (req, res, next) => organizadorController.deleteRegister(req, res, next));

module.exports = router;