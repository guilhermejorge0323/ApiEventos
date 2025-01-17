const Service = require('./Service');
const Erro404 = require('../errors/Erro404');

class EventoService extends Service {
    constructor(){
        super('Evento');
    }

    async getParticipantesEvento(id){
        const evento = await super.getById(id);
        if(!evento){
            throw new Erro404('Evento não encontrado');
        }
        const listaParticipantes = await evento.getParticipantesDoEvento();
        return listaParticipantes;
    }

    async getIngressosEvento(id){
        const evento = await super.getById(id);
        if(!evento){
            throw new Erro404('Evento não encontrado');
        }
        const listaIngressos = await evento.getIngressosDoEvento();
        return listaIngressos;
    }

    async getFeedBacksEvento(id){
        const evento = await super.getById(id);
        if(!evento){
            throw new Erro404('Evento não encontrado');
        }
        const listaFeedbacks = await evento.getFeedbacksDoEvento();
        return listaFeedbacks;
    }
}

module.exports = EventoService;