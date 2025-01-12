const express = require('express');
const OrganizadorController = require('../controllers/OrganizadorController');


const router = express.Router();
const organizadorController = new OrganizadorController();


router.get('/organizador', (req, res) => organizadorController.getAllRegisters(req, res));
router.get('/organizador/:id', (req, res) => organizadorController.getRegisterById(req, res));
router.post('/organizador', (req, res) => organizadorController.postRegister(req, res));
router.put('/organizador/:id', (req, res) => organizadorController.putRegister(req, res));
router.delete('/organizador/:id', (req, res) => organizadorController.deleteRegister(req, res));

module.exports = router;