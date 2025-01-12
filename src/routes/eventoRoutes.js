const express = require('express');
const EventoController = require('../controllers/EventoController');
const OrganizadorController = require('../controllers/OrganizadorController');

const router = express.Router();
const eventoController = new EventoController();
const organizadorController = new OrganizadorController();


// Crud em eventos globais
router.get('/evento', (req, res) => eventoController.getAllRegisters(req, res));
router.get('/evento/:id', (req, res) => eventoController.getRegisterById(req, res));
router.post('/evento', (req, res) => eventoController.postRegister(req, res));
router.put('/evento/:id', (req, res) => eventoController.putRegister(req, res));
router.delete('/evento/:id', (req, res) => eventoController.deleteRegister(req, res));

// CRUD em eventos especificos por organizadores
router.get('/organizador/:organizador_id/evento', (req, res) => organizadorController.getAllEventosOrganizador(req, res));
router.get('/organizador/:organizador_id/evento/:id', (req, res) => eventoController.getOneRegister(req, res));
router.post('/organizador/:organizador_id/evento', (req, res) => eventoController.createEventoPorOrganizador(req, res));
router.put('/organizador/:organizador_id/evento/:id', (req, res) => eventoController.putRegister(req, res));
router.delete('/organizador/:organizador_id/evento/:id', (req, res) => eventoController.deleteRegister(req, res));






module.exports = router;