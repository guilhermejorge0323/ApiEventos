const express = require('express');
const organizadorRoutes = require('./organizadorRoutes');
const eventoRoutes = require('./eventoRoutes');
const participanteRoutes = require('./participanteRoutes');
const ingressoRoutes = require('./ingressoRoutes');
const feedbackRoutes = require('./feedbackRoutes');

const router = express.Router();

router.use(organizadorRoutes);
router.use(eventoRoutes);
router.use(participanteRoutes);
router.use(ingressoRoutes);
router.use(feedbackRoutes);

module.exports = router;