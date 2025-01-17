const Controller = require('./Controller');
const OrganizadorService = require('../services/OrganizadorService');
const Erro404 = require('../errors/Erro404');

const organizadorService = new OrganizadorService();

class OrganizadorController extends Controller {
    constructor(){
        super(organizadorService);
    }

    async getAllEventosOrganizador(req,res,next){
        const { organizador_id }= req.params;
        try {
            const eventos = await organizadorService.getEventosOrganizador(organizador_id);
            if(!eventos.length) {
                throw new Erro404('Organizador sem eventos');
            }
            res.status(200).json(eventos);
        } catch (error) {
            next(error);
        }
    }

    async getOrganizadoresAtivos(req,res,next){
        try {
            const registers = await organizadorService.getByScope('ativos');
            if(!registers.length) {
                throw new Erro404('Sem organizadores ativos');
            }
            res.status(200).json(registers);
        } catch (error) {
            next(error);
        }
    }

    async getOrganizadoresInativos(req,res,next){
        try {
            const registers = await organizadorService.getByScope('inativos');
            if(!registers.length) {
                throw new Erro404('Sem organizadores inativos');
            }
            res.status(200).json(registers);
        } catch (error) {
            next(error);
        }
    }


}

module.exports = OrganizadorController;