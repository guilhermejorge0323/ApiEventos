const Controller = require('./Controller');
const IngressoService = require('../services/IngressoService');
const convertIds = require('../utils/convertIds');


const ingressoService = new IngressoService();

class IngressoController extends Controller {
    constructor(){
        super(ingressoService);
    }

    async desativaIngresso(req,res){
        const { evento_id ,participante_id } = req.params;
        console.log(Number(participante_id));
        try {
            await ingressoService.updateRegister({ ativo: false },{ evento_id: evento_id ,participante_id: participante_id });
            res.status(200).json('Ingresso desativado com sucesso');
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

}

module.exports = IngressoController;