const express = require('express');
const IngressoController = require('../controllers/IngressoController');
const EventoController = require('../controllers/EventoController');
const ParticipanteController = require('../controllers/ParticipanteController');

const router = express.Router();
const ingressoController = new IngressoController();
const eventoController = new EventoController();
const participanteController = new ParticipanteController();

router.get('/evento/:evento_id/ingresso/', (req, res,next) => eventoController.getAllIngressosEvento(req, res,next));
router.get('/evento/:evento_id/participante/:participante_id/ingresso/', (req, res,next) => participanteController.getIngressoDoParticipante(req, res,next));
router.put('/evento/:evento_id/participante/:participante_id/ingresso/', (req, res,next) => ingressoController.putRegister(req, res,next));
router.put('/evento/:evento_id/participante/:participante_id/ingresso/desativar', (req, res,next) => ingressoController.desativaIngresso(req, res,next));


module.exports = router;