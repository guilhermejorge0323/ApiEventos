const Service = require('./Service');
const Erro404 = require('../errors/Erro404');

class OrganizadorService extends Service {
    constructor(){
        super('Organizador');
    }

    async getEventosOrganizador(id) {
        const organizador = await super.getById(id);
        if(!organizador) {
            throw new Erro404('Organizador não encontrado');
        };
        const listaEventos = await organizador.getEventosDoOrganizador();
        return listaEventos;
    }

}

module.exports = OrganizadorService;