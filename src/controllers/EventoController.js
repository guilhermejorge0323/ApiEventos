const Controller = require('./Controller');
const EventoService = require('../services/EventoService');

const eventoService = new EventoService();

class EventoController extends Controller {
    constructor(){
        super(eventoService);
    }

    async getAllParticipantesEvento(req,res){
        const { evento_id }= req.params;
        try {
            const participantes = await eventoService.getParticipantesEvento(evento_id);
            if (!participantes.length){
                res.status(404).json('Evento sem participantes');
                return;
            }
            res.status(200).json(participantes);
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

    async getAllIngressosEvento(req,res){
        const { evento_id }= req.params;
        try {
            const ingressos = await eventoService.getIngressosEvento(evento_id);
            if (!ingressos.length){
                res.status(404).json('Evento sem Ingressos');
                return;
            }
            res.status(200).json(ingressos);
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

    async getAllFeedBacksEvento(req,res){
        const { evento_id }= req.params;
        try {
            const feedbacks = await eventoService.getFeedBacksEvento(evento_id);
            if (!feedbacks.length){
                res.status(404).json('Evento sem feedbacks');
                return;
            }
            res.status(200).json(feedbacks);
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

    async createEventoPorOrganizador(req,res){
        const data = req.body;
        try {
            if(parseInt(req.params.organizador_id) !== data.organizador_id){
                throw new Error('O id da url nao corresponde com o id passado em organizador_id');
            }
            const register = await eventoService.createRegister(data);
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            res.send(error.message);
            console.log(error);
        }
    }
}

module.exports = EventoController;