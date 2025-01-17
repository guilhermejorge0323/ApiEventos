const Controller = require('./Controller');
const IngressoService = require('../services/IngressoService');
const convertIds = require('../utils/convertIds');


const ingressoService = new IngressoService();

class IngressoController extends Controller {
    constructor(){
        super(ingressoService);
    }

    async desativaIngresso(req,res,next){
        const { evento_id ,participante_id } = req.params;
        try {
            await ingressoService.updateRegister({ ativo: false },{ evento_id: evento_id ,participante_id: participante_id });
            res.status(200).json('Ingresso desativado com sucesso');
        } catch (error) {
            next(error);
        }
    }

}

module.exports = IngressoController;