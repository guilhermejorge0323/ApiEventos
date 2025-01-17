const express = require('express');
const EventoController = require('../controllers/EventoController');
const OrganizadorController = require('../controllers/OrganizadorController');

const router = express.Router();
const eventoController = new EventoController();
const organizadorController = new OrganizadorController();


// Crud em eventos globais
router.get('/evento', (req, res,next) => eventoController.getAllRegisters(req, res,next));
router.get('/evento/:id', (req, res,next) => eventoController.getRegisterById(req, res,next));
router.post('/evento', (req, res,next) => eventoController.postRegister(req, res,next));
router.put('/evento/:id', (req, res,next) => eventoController.putRegister(req, res,next));
router.delete('/evento/:id', (req, res,next) => eventoController.deleteRegister(req, res,next));

// CRUD em eventos especificos por organizadores
router.get('/organizador/:organizador_id/evento', (req, res,next) => organizadorController.getAllEventosOrganizador(req, res,next));
router.get('/organizador/:organizador_id/evento/:id', (req, res,next) => eventoController.getOneRegister(req, res,next));
router.post('/organizador/:organizador_id/evento', (req, res,next) => eventoController.createEventoPorOrganizador(req, res,next));
router.put('/organizador/:organizador_id/evento/:id', (req, res,next) => eventoController.putRegister(req, res,next));
router.delete('/organizador/:organizador_id/evento/:id', (req, res,next) => eventoController.deleteRegister(req, res,next));






module.exports = router;