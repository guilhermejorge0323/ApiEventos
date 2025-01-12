const Service = require('./Service');

class OrganizadorService extends Service {
    constructor(){
        super('Organizador');
    }

    async getEventosOrganizador(id) {
        const organizador = await super.getById(id);
        if(!organizador) {
            throw new Error('Organizador não encontrado');
        };
        const listaEventos = await organizador.getEventosDoOrganizador();
        return listaEventos;
    }

}

module.exports = OrganizadorService;