const Controller = require('./Controller');
const FeedBackService = require('../services/FeedBackService');
const ParticipanteService = require('../services/ParticipanteService');
const EventoService = require('../services/EventoService');
const Erro404 = require('../errors/Erro404');

const feedbackService = new FeedBackService();


class FeedBackController extends Controller {
    constructor(){
        super(feedbackService);
        this.participanteService = new ParticipanteService();
        this.eventoService = new EventoService();
    }

    async createFeedback(req,res,next){
        const data = req.body;
        const { evento_id, participante_id } = req.params;
        const participante = await this.participanteService.getOne({ id: participante_id ,evento_id: evento_id });
        const evento = await this.eventoService.getById(evento_id);
        try {
            if(!evento){
                throw new Erro404('Evento nao existe');
            }
            if(!participante){
                throw new Erro404('Participante nao existe');
            }
            const register = await feedbackService.createRegister({...data, evento_id: Number(evento_id), participante_id: Number(participante_id)});
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = FeedBackController;