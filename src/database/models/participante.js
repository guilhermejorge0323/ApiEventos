'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Participante extends Model {
        static associate(models) {
            Participante.hasMany(models.Ingresso,{
                foreignKey: 'participante_id',
                onDelete: 'CASCADE',
                as: 'ingressoDoPartipante'
            });

            Participante.hasMany(models.FeedBack,{
                foreignKey: 'participante_id',
                onDelete: 'CASCADE',
                as: 'feedbackDoParticipante'
            });

            Participante.belongsTo(models.Evento,{
                foreignKey: 'evento_id',
            });
        }
    }
    Participante.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Participante',
        tableName: 'participantes',
        paranoid: true,
    });

    Participante.afterCreate(async (participante, options)=> {
        const { Ingresso } = sequelize.models;

        const ingressoData = options.ingresso;

        try {
            await Ingresso.create({
                tipo: ingressoData.tipo || 'Normal',
                preco: ingressoData.preco || '0',
                ativo: ingressoData.ativo || true,
                evento_id:  participante.evento_id,
                participante_id: participante.id,
            });
        } catch (error) {
            throw new Error('Erro ao criar o ingresso' + error.message);
        }
    });

    Participante.beforeDestroy(async (participante, options)=> {
        const ingressos = await sequelize.models.Ingresso.findAll({
            where: { participante_id: participante.id },
        });
        for (const ingresso of ingressos){
            await ingresso.destroy();
        }

        const feedbacks = await sequelize.models.FeedBack.findAll({
            where: { participante_id: participante.id },
        });
        for (const feedback of feedbacks){
            await feedback.destroy();
        }
    });
    return Participante;
};