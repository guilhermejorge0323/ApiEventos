const convertIds = require('../utils/convertIds');
const Erro404 = require('../errors/Erro404');
const db = require('../database/models');


class Controller {
    constructor(service){
        this.service = service;
    }

    async getAllRegisters(req,res, next){
        try {
            const registers = await this.service.getAll();
            if(registers.length === 0){
                throw new Erro404('Sem registros');
            }
            res.status(200).json(registers);
        } catch (error) {
            next(error);
        }
    }

    async getRegisterById(req, res,next){
        const {id} = req.params;
        try {
            const register = await this.service.getById(id);
            if (!register) {
                throw new Erro404('Registro nao encontrado');
            }
            res.status(200).json(register);
        } catch (error) {
            next(error);
        }
    }

    async getOneRegister(req, res, next){
        const { ...params } = req.params;
        const where = convertIds(params);
        try {
            const register = await this.service.getOne(where);
            if (!register) {
                throw new Erro404('Registro nao encontrado');
            }
            return res.status(200).json(register);
        } catch (error) {
            next(error);
        }
    }

    async postRegister(req, res,next){
        const data = req.body;
        const transaction = await db.sequelize.transaction();
        try {
            const register = await this.service.createRegister(data, {transaction: transaction});
            transaction.commit();
            res.status(201).json({ message: 'Registro criado com sucesso', registro: register });
        } catch (error) {
            transaction.rollback();
            console.log(error);
            next(error);
        }
    }

    async putRegister(req, res,next){
        const data = req.body;
        const { ...params } = req.params;
        const where = convertIds(params);
        const transaction = await db.sequelize.transaction();
        try {
            const register = await this.service.updateRegister(data,where,transaction);
            if(!register){
                transaction.rollback();
                throw new Error('Nenhum registro atualizado atualizado');
            }
            transaction.commit();
            res.status(200).json({ message: `Registro de id:${where.id} atualizado com sucesso`});
        } catch (error) {
            transaction.rollback();
            next(error);
        }
    }

    async deleteRegister(req, res,next){
        const { ...params } = req.params;
        const where = convertIds(params);
        try {
            await this.service.destroyRegister(where);
            res.status(200).json({ message: `Registro de id:${where.id} apagado com sucesso`});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;