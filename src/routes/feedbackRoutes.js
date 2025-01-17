const express = require('express');
const FeedBackController = require('../controllers/FeedBackController');
const EventoController = require('../controllers/EventoController');
const ParticipanteController = require('../controllers/ParticipanteController');

const router = express.Router();
const feedbackController = new FeedBackController();
const eventoController = new EventoController();
const participanteController = new ParticipanteController();

router.get('/evento/:evento_id/feedback', (req, res,next) => eventoController.getAllFeedBacksEvento(req, res,next));
router.get('/evento/:evento_id/participante/:participante_id/feedback/', (req, res,next) => participanteController.getFeedBackDoParticipante(req, res,next));
router.get('/evento/:evento_id/participante/:participante_id/feedback/:id', (req, res,next) => feedbackController.getOneRegister(req, res,next));
router.post('/evento/:evento_id/participante/:participante_id/feedback', (req, res,next) => feedbackController.createFeedback(req, res,next));
router.put('/evento/:evento_id/participante/:participante_id/feedback/:id', (req, res,next) => feedbackController.putRegister(req, res,next));
router.delete('/evento/:evento_id/participante/:participante_id/feedback/:id', (req, res,next) => feedbackController.deleteRegister(req, res,next));


module.exports = router;