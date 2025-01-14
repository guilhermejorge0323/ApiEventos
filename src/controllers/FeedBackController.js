const Controller = require('./Controller');
const FeedBackService = require('../services/FeedBackService');
const ParticipanteService = require('../services/ParticipanteService');
const EventoService = require('../services/EventoService');

const feedbackService = new FeedBackService();


class FeedBackController extends Controller {
    constructor(){
        super(feedbackService);
        this.participanteService = new ParticipanteService();
        this.eventoService = new EventoService();
    }

    async createFeedback(req,res){
        const data = req.body;
        const { evento_id, participante_id } = req.params;
        const participante = await this.participanteService.getById(participante_id);
        const evento = await this.eventoService.getById(evento_id);
        try {
            if(!evento){
                res.status(404).json('evento nao existe');
                return;
            }
            if(!participante){
                res.status(404).json('participante nao existe');
                return;
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