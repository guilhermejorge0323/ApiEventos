const express = require('express');
const ParticipanteController = require('../controllers/ParticipanteController');
const EventoController = require('../controllers/EventoController');

const router = express.Router();
const participanteController = new ParticipanteController();
const eventoController = new EventoController();

router.get('/evento/:evento_id/participante', (req, res,next) => eventoController.getAllParticipantesEvento(req, res,next));
router.get('/evento/:evento_id/participante/:id', (req, res,next) => participanteController.getOneRegister(req, res,next));
router.post('/evento/:evento_id/participante', (req, res,next) => participanteController.createParticipantePorEvento(req, res,next));
router.put('/evento/:evento_id/participante/:id', (req, res,next) => participanteController.putRegister(req, res,next));
router.delete('/evento/:evento_id/participante/:id', (req, res,next) => participanteController.deleteRegister(req, res,next));

module.exports = router;