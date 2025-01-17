const Controller = require('./Controller');
const EventoService = require('../services/EventoService');
const Erro404 = require('../errors/Erro404');

const eventoService = new EventoService();

class EventoController extends Controller {
    constructor(){
        super(eventoService);
    }

    async getAllParticipantesEvento(req,res,next){
        const { evento_id }= req.params;
        try {
            const participantes = await eventoService.getParticipantesEvento(evento_id);
            if (!participantes.length){
                throw new Erro404('Evento sem participantes');
            }
            res.status(200).json(participantes);
        } catch (error) {
            next(error);
        }
    }

    async getAllIngressosEvento(req,res,next){
        const { evento_id }= req.params;
        try {
            const ingressos = await eventoService.getIngressosEvento(evento_id);
            if (!ingressos.length){
                throw new Erro404('Evento sem partcipantes e ingressos');
            }
            res.status(200).json(ingressos);
        } catch (error) {
            next(error);
        }
    }

    async getAllFeedBacksEvento(req,res,next){
        const { evento_id }= req.params;
        try {
            const feedbacks = await eventoService.getFeedBacksEvento(evento_id);
            if (!feedbacks.length){
                throw new Erro404('Evento sem feedbacks');
            }
            res.status(200).json(feedbacks);
        } catch (error) {
            next(error);
        }
    }

    async createEventoPorOrganizador(req,res,next){
        const data = req.body;
        const {organizador_id} = req.params;
        try {
            const register = await eventoService.createRegister({...data, organizador_id: Number(organizador_id)});
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = EventoController;