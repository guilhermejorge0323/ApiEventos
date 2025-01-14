'use strict';

const validadorTelefone = require('../../utils/validadorTelefone');

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
        nome: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo nome não pode estar vazio'
                },
                len: {
                    args: [3, 100],
                    msg: 'Nome do participante deve ter entre 3 e 100 caracteres.',
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo nome não pode estar vazio'
                },
                isEmail: {
                    args: true,
                    msg: 'O email é invalido.'
                }
            }
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                telefoneValido: (telefone) => {
                    if(!validadorTelefone(telefone)) throw new Error('Telefone invalido');
                }
            }
        },
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Participante',
        tableName: 'participantes',
        paranoid: true,
        hooks: {
            beforeCreate: (participante) => {
                participante.telefone = validadorTelefone(participante.telefone);
            },
            beforeUpdate: (participante) => {
                participante.telefone = validadorTelefone(participante.telefone);
            }
        }
    });

    Participante.afterCreate(async (participante, options)=> {
        const { Ingresso } = sequelize.models;
        const transaction = options.transaction;

        const ingressoData = options.ingresso;

        try {
            await Ingresso.create({
                tipo: ingressoData.tipo || 'NORMAL',
                preco: ingressoData.preco || '0,01',
                ativo: ingressoData.ativo || true,
                evento_id:  participante.evento_id,
                participante_id: participante.id,
            }, {transaction: transaction});
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