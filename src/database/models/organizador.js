'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Organizador extends Model {
        static associate(models) {
            Organizador.hasMany(models.Evento,{
                foreignKey: 'organizador_id',
                onDelete: 'CASCADE',
                as: 'eventosDoOrganizador'
            });
        }
    }
    Organizador.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Organizador',
        tableName: 'organizadores',
        paranoid: true
    });
    // Hook para destruir todos os eventos associados ao organizador quando um organizador for deletado
    Organizador.beforeDestroy(async (organizador, options) => {
        const eventos = await sequelize.models.Evento.findAll({
            where: { organizador_id: organizador.id },
        });

        for (const evento of eventos) {

            const participantes = await sequelize.models.Participante.findAll({
                where: { evento_id: evento.id },
            });
            for (const participante of participantes){
                await participante.destroy();
            }

            const ingressos = await sequelize.models.Ingresso.findAll({
                where: { evento_id: evento.id },
            });
            for (const ingresso of ingressos) {
                await ingresso.destroy();
            }

            const feedBacks = await sequelize.models.FeedBack.findAll({
                where: { evento_id: evento.id },
            });
            for (const feedBack of feedBacks) {
                await feedBack.destroy();
            }

            await evento.destroy();
        }
    });
    return Organizador;
};