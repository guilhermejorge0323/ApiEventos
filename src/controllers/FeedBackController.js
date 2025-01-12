const Controller = require('./Controller');
const FeedBackService = require('../services/FeedBackService');
const ParticipanteService = require('../services/ParticipanteService');

const feedbackService = new FeedBackService();


class FeedBackController extends Controller {
    constructor(){
        super(feedbackService);
        this.participanteService = new ParticipanteService();
    }

    async createFeedback(req,res){
        const data = req.body;
        const { evento_id, participante_id } = req.params;
        const participante = await this.participanteService.getById(participante_id);
        try {
            if(!participante){
                res.status(404).json('participante nao existe');
            }
            const register = await feedbackService.createRegister({...data, evento_id: Number(evento_id), participante_id: Number(participante_id)});
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            res.send(error.message);
            console.log(error);
        }
    }

}

module.exports = FeedBackController;