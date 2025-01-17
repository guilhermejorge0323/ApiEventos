const Controller = require('./Controller');
const ParticipanteService = require('../services/ParticipanteService');
const EventoService = require('../services/EventoService');
const Erro404 = require('../errors/Erro404');
const db = require('../database/models');


const participanteService = new ParticipanteService();

class ParticipanteController extends Controller {
    constructor(){
        super(participanteService);
        this.eventoService = new EventoService();
    }

    async getIngressoDoParticipante(req,res,next){
        const { participante_id, evento_id } = req.params;
        try {
            const ingresso = await participanteService.getIngressoParticipante(participante_id,evento_id);
            res.status(200).json({message: `Ingreso do participante de id:${participante_id}`, ingresso: ingresso});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getFeedBackDoParticipante(req, res,next){
        const { participante_id } = req.params;
        try {
            const feedback = await participanteService.getFeedBackParticipante(participante_id);
            if(feedback.length === 0){
                throw new Erro404('Participante sem feedback');
            }
            res.status(200).json({message: `FeedBack do participante de id:${participante_id}`, feedback: feedback});
        } catch (error) {
            next(error);
        }
    }

    async createParticipantePorEvento(req,res,next){
        const { evento_id } = req.params;
        const evento = await this.eventoService.getById(evento_id);
        const { participante, ingresso} = req.body;
        const transaction = await db.sequelize.transaction();
        try {
            if(!evento){
                throw new Erro404('Evento não encontrado');
            }
            const register = await participanteService.createRegister({...participante,evento_id: Number(evento_id)},{ingresso,transaction});
            transaction.commit();
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            transaction.rollback();
            next(error);
        }
    }
}

module.exports = ParticipanteController;