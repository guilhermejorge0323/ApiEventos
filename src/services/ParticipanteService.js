const Service = require('./Service');
const Erro404 = require('../errors/Erro404');
const { sequelize } = require('../database/models');

class ParticipanteService extends Service {
    constructor(){
        super('Participante');
    }

    async getIngressoParticipante(id,evento_id){
        const evento = await sequelize.models.Evento.findByPk(evento_id);
        if(!evento){
            throw new Erro404('Evento não encontrado');
        }
        const participante = await sequelize.models.Participante.findOne({ where: { id: id, evento_id: evento_id } });
        console.log(participante);
        
        if(!participante){
            throw new Erro404('Participante não encontrado');
        }
        const ingresso = await participante.getIngressoDoPartipante();
        return ingresso;
    }

    async getFeedBackParticipante(id){
        const participante = await super.getById(id);
        if(!participante){
            throw new Erro404('Participante não encontrado');
        }
        const feedback = await participante.getFeedbackDoParticipante();
        return feedback;
    }

}

module.exports = ParticipanteService;