const express = require('express');
const ParticipanteController = require('../controllers/ParticipanteController');
const EventoController = require('../controllers/EventoController');

const router = express.Router();
const participanteController = new ParticipanteController();
const eventoController = new EventoController();

router.get('/evento/:evento_id/participante', (req, res) => eventoController.getAllParticipantesEvento(req, res));
router.get('/evento/:evento_id/participante/:id', (req, res) => participanteController.getOneRegister(req, res));
router.post('/evento/:evento_id/participante', (req, res) => participanteController.createParticipantePorEvento(req, res));
router.put('/evento/:evento_id/participante/:id', (req, res) => participanteController.putRegister(req, res));
router.delete('/evento/:evento_id/participante/:id', (req, res) => participanteController.deleteRegister(req, res));

module.exports = router;