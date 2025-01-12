const express = require('express');
const IngressoController = require('../controllers/IngressoController');
const EventoController = require('../controllers/EventoController');
const ParticipanteController = require('../controllers/ParticipanteController');

const router = express.Router();
const ingressoController = new IngressoController();
const eventoController = new EventoController();
const participanteController = new ParticipanteController();

router.get('/evento/:evento_id/ingresso', (req, res) => eventoController.getAllIngressosEvento(req, res));
router.get('/evento/:evento_id/participantes/:participante_id/ingresso', (req, res) => participanteController.getIngressoDoParticipante(req, res));
router.put('/evento/:evento_id/participantes/:participante_id/ingresso/', (req, res) => ingressoController.putRegister(req, res));
router.put('/evento/:evento_id/participantes/:participante_id/ingresso/desativar', (req, res) => ingressoController.desativaIngresso(req, res));


module.exports = router;