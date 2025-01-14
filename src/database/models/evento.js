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
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido o nome do evento'
                },
                len: {
                    args: [2,100],
                    msg: 'O nome do evento deve ter entre 2 e 100 caracteres'
                }
            }
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido a descrição do evento'
                },
                len: {
                    args: [3,500],
                    msg: 'A descrição do evento deve ter entre 3 e 500 caracteres'
                }
            }
        },
        data_inicio:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido a data de inicio do evento'
                },
                isDate: {
                    args: true,
                    msg: 'A data de inicio do evento deve ser uma data válida'
                }
            }
        },
        data_fim: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido a data do fim do evento'
                },
                isDate: {
                    args: true,
                    msg: 'A data do fim do evento deve ser uma data válida'
                }
            }
        },
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Evento',
        tableName: 'eventos',
        paranoid: true,
        hooks: {
            beforeCreate: async (evento) => {
                // valida se o organizador existe
                const organizador = await sequelize.models.Organizador.findByPk(evento.organizador_id);
                if(!organizador){
                    throw new Error('Organizador não encontrado');
                }

                // valida se as datas de inicio e fim do evento
                if(new Date(evento.data_inicio) > new Date(evento.data_fim)){
                    throw new Error('A data de início do evento não pode ser posterior à data de término');
                }
            },

            beforeUpdate: async (evento) => {
                // valida se o organizador existe
                const organizador = await sequelize.models.Organizador.findByPk(evento.organizador_id);
                if(!organizador){
                    throw new Error('Organizador não encontrado');
                }

                // valida se as datas de inicio e fim do evento
                const eventoAtual = await sequelize.models.Evento.findByPk(evento.id);

                const dataInicio = evento.data_inicio || eventoAtual.data_inicio;
                const dataFim = evento.data_fim || eventoAtual.data_fim;

                if(new Date(dataInicio) > new Date(dataFim)){
                    throw new Error('A data inicio nao deve ser maior que a data fim');
                }
            }
        }
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