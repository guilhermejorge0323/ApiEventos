const convertIds = require('../utils/convertIds');


class Controller {
    constructor(service){
        this.service = service;
    }

    async getAllRegisters(req,res){
        try {
            const registers = await this.service.getAll();
            res.status(200).json(registers);
        } catch (error) {
            res.json(error.message);
            console.log(error);
        }
    }

    async getRegisterById(req, res){
        const {id} = req.params;
        try {
            const register = await this.service.getById(id);
            res.status(200).json(register);
        } catch (error) {
            res.json(error.message);
            console.log(error);
        }
    }

    async getOneRegister(req, res){
        const { ...params } = req.params;
        const where = convertIds(params);
        try {
            const register = await this.service.getOne(where);
            return res.status(200).json(register);
        } catch (error) {
            res.json(error.message);
            console.log(error);
        }
    }

    async postRegister(req, res){
        const data = req.body;
        try {
            const register = await this.service.createRegister(data);
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            res.json(error.message);
            console.log(error);
        }
    }

    async putRegister(req, res){
        const data = req.body;
        const { ...params } = req.params;
        const where = convertIds(params);
        try {
            const register = await this.service.updateRegister(data,where);
            console.log(register);
            if(!register){
                throw new Error('Nao atualizado');
            }

            res.status(200).json({ message: `Registro de id:${where} atualizado com sucesso`});
        } catch (error) {
            res.json(error.message);
            console.log(error);
        }
    }

    async deleteRegister(req, res){
        const { ...params } = req.params;
        const where = convertIds(params);
        try {
            await this.service.destroyRegister(where);
            res.status(200).json({ message: `Registro de id:${where.id} apagado com sucesso`});
        } catch (error) {
            res.json(error.message);
            console.log(error);
        }
    }
}

module.exports = Controller;