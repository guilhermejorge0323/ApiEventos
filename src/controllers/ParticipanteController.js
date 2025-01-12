const Controller = require('./Controller');
const ParticipanteService = require('../services/ParticipanteService');
const EventoService = require('../services/EventoService');

const participanteService = new ParticipanteService();

class ParticipanteController extends Controller {
    constructor(){
        super(participanteService);
        this.eventoService = new EventoService();
    }

    async getIngressoDoParticipante(req,res){
        const { participante_id } = req.params;
        try {
            const ingresso = await participanteService.getIngressoParticipante(participante_id);
            res.status(200).json({message: `Ingreso do participante de id:${participante_id}`, ingresso: ingresso});
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

    async getFeedBackDoParticipante(req, res){
        const { participante_id } = req.params;
        try {
            const feedback = await participanteService.getFeedBackParticipante(participante_id);
            if(feedback.length === 0){
                res.status(404).json('Participante sem feedback');
                return;
            }
            res.status(200).json({message: `FeedBack do participante de id:${participante_id}`, feedback: feedback});
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

    async createParticipantePorEvento(req,res){
        const { evento_id } = req.params;
        const evento = await this.eventoService.getById(evento_id);
        const { participante, ingresso} = req.body;
        try {
            if(!evento){
                throw new Error('Evento não encontrado');
            }
            const register = await participanteService.createRegister({...participante,evento_id: Number(evento_id)},{ingresso});
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            res.send(error.message);
            console.log(error);
        }
    }
}

module.exports = ParticipanteController;