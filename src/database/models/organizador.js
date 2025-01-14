'use strict';

const validadorCpf = require('../../utils/validadorCpf');
const validadorTelefone = require('../../utils/validadorTelefone');

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
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido o nome do organizador'
                },
                len: {
                    args: [3, 70],
                    msg: 'O nome do organizador deve ter entre 3 e 70 caracteres'
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
                    msg: 'E Requerido o email do organizador'
                },
                isEmail: {
                    args: true,
                    msg: 'O email e invalido siga o modelo aaaaaa@aaaaa.com'
                }
            }
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido o CPF do organizador'
                },
                cpfValido: (cpf) => {
                    if (!validadorCpf(cpf)) throw new Error('CPF nao e valido');
                }
            }
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E Requerido o telefone do organizador'
                },
                telefoneValido: (telefone) => {
                    if (!validadorTelefone(telefone)) throw new Error('Telefone nao e valido');
                }
            }
        },
        ativo: DataTypes.BOOLEAN,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Organizador',
        tableName: 'organizadores',
        paranoid: true,
        hooks: {
            beforeCreate: (organizador) => {
                organizador.cpf = validadorCpf(organizador.cpf);
                organizador.telefone = validadorTelefone(organizador.telefone);
            },
            beforeUpdate: (organizador) => {
                organizador.cpf = validadorCpf(organizador.cpf);
                organizador.telefone = validadorTelefone(organizador.telefone);
            }
        }
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