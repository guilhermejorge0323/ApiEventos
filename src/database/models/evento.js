'use strict';
const {
    Model,
    where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Evento extends Model {
        static associate(models) {
            Evento.hasMany(models.Participante, {
                foreignKey: 'evento_id',
                onDelete: 'CASCADE',
                as: 'participantesDoEvento'
            });

            Evento.hasMany(models.Ingresso,{
                foreignKey: 'evento_id',
                onDelete: 'CASCADE',
                scope: { ativo: true },
                as: 'ingressosDoEvento'
            });

            Evento.hasMany(models.FeedBack,{
                foreignKey: 'evento_id',
                onDelete: 'CASCADE',
                as: 'feedbacksDoEvento'
            });

            Evento.belongsTo(models.Organizador,{
                foreignKey: 'organizador_id'
            });
        }
    }
    Evento.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        data_inicio: DataTypes.DATEONLY,
        data_fim: DataTypes.DATEONLY,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Evento',
        tableName: 'eventos',
        paranoid: true
    });

    Evento.beforeDestroy(async (evento, options) => {
        const participantes = await sequelize.models.Participante.findAll({
            where: { evento_id: evento.id },
        });

        for (const participante of participantes) {

            const ingressos = await sequelize.models.Ingresso.findAll({
                where: { participante_id: participante.id },
            });
            for (const ingresso of ingressos) {
                await ingresso.destroy();
            }

            const feedbacks = await sequelize.models.FeedBack.findAll({
                where: { participante_id: participante.id },
            });
            for (const feedback of feedbacks) {
                await feedback.destroy();
            }

            await participante.destroy();

        }
    });
    return Evento;
};