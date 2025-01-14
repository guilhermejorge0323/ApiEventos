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
        const transaction = options.transaction || null;
        return db[this.model].create(data, {
            ...options,
            transaction,
        });;
    }

    async updateRegister(data,where = {},transaction = {}){
        const instances = await db[this.model].findAll({where : {...where}, transaction: transaction});
        if (instances.length === 0) {
            throw new Error('Nenhum registro encontrado');
        }



        for (let instance of instances) {
            const reg = await instance.update(data, { transaction: transaction });
            if(reg[0] === 0){
                return false;
            }
        }

        return true;
    }

    async destroyRegister(where = {}) {
        const instance = await db[this.model].findOne({where : {...where}});
        if (!instance) {
            throw new Error('Registro não encontrado');
        }

        return instance.destroy();
    }
}

module.exports = Service;