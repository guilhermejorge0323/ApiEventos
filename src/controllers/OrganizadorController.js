const Controller = require('./Controller');
const OrganizadorService = require('../services/OrganizadorService');

const organizadorService = new OrganizadorService();

class OrganizadorController extends Controller {
    constructor(){
        super(organizadorService);
    }

    async getAllEventosOrganizador(req,res){
        const { organizador_id }= req.params;
        try {
            const eventos = await organizadorService.getEventosOrganizador(organizador_id);
            if(!eventos.length) {
                return res.status(404).json('Organizador sem eventos');
            }
            res.status(200).json(eventos);
        } catch (error) {
            res.send(error.message);
            console.log(error);
        }
    }
}

module.exports = OrganizadorController;