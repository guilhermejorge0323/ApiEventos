const db = require('../database/models');

class Service {
    constructor(model){
        this.model = model;
    }

    async getAll(){
        return db[this.model].findAll();
    }

    async getById(id){
        return db[this.model].findByPk(id);
    }

    async getOne(where = {}){
        return db[this.model].findOne({ where: {...where}});
    }

    async createRegister(data, options = {}){
        return db[this.model].create(data, options);
    }

    async updateRegister(data,where = {}){
        const updateReg = await db[this.model].update(data,{ where: {...where} });

        if(updateReg[0] === 0){
            return false;
        }

        return true;
    }

    async destroyRegister(where = {}) {
        const instance = await db[this.model].findOne({where : {...where}});
        if (!instance) {
            throw new Error(`Registro com ID ${where.id} não encontrado`);
        }

        return instance.destroy();
    }
}

module.exports = Service;