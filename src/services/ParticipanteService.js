const Service = require('./Service');

class ParticipanteService extends Service {
    constructor(){
        super('Participante');
    }

    async getIngressoParticipante(id){
        const participante = await super.getById(id);
        if(!participante){
            throw new Error('Participante não encontrado');
        }
        const ingresso = await participante.getIngressoDoPartipante();
        return ingresso;
    }

    async getFeedBackParticipante(id){
        const participante = await super.getById(id);
        if(!participante){
            throw new Error('Participante não encontrado');
        }
        const feedback = await participante.getFeedbackDoParticipante();
        return feedback;
    }

}

module.exports = ParticipanteService;