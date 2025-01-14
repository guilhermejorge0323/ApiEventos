const express = require('express');
const FeedBackController = require('../controllers/FeedBackController');
const EventoController = require('../controllers/EventoController');
const ParticipanteController = require('../controllers/ParticipanteController');

const router = express.Router();
const feedbackController = new FeedBackController();
const eventoController = new EventoController();
const participanteController = new ParticipanteController();

router.get('/evento/:evento_id/feedback', (req, res) => eventoController.getAllFeedBacksEvento(req, res));
router.get('/evento/:evento_id/participante/:participante_id/feedback/', (req, res) => participanteController.getFeedBackDoParticipante(req, res));
router.get('/evento/:evento_id/participante/:participante_id/feedback/:id', (req, res) => feedbackController.getOneRegister(req, res));
router.post('/evento/:evento_id/participante/:participante_id/feedback', (req, res) => feedbackController.createFeedback(req, res));
router.put('/evento/:evento_id/participante/:participante_id/feedback/:id', (req, res) => feedbackController.putRegister(req, res));
router.delete('/evento/:evento_id/participante/:participante_id/feedback/:id', (req, res) => feedbackController.deleteRegister(req, res));


module.exports = router;