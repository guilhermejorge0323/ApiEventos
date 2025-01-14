'use strict';

const validaPreco = require('../../utils/validadorPreco');

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ingresso extends Model {
        static associate(models) {
            Ingresso.belongsTo(models.Evento,{
                foreignKey: 'evento_id',
            });

            Ingresso.belongsTo(models.Participante,{
                foreignKey: 'participante_id',
            });
        }
    }
    Ingresso.init({
        tipo: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'E requerido que preencha o tipo com NORMAL/VIP/CAMAROTE',
                },
                isIn: {
                    args: [['NORMAL','VIP','CAMAROTE']],
                    msg: 'O tipo do ingresso deve ser NORMAL/VIP/CAMAROTE',
                }
            }
        },
        preco: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                precoValido: (preco) => {
                    if(!validaPreco(preco)) throw new Error('O preco e invalido siga o formato xx.xx  ou xx,xx  ou xxx');
                }
            },
        },
        ativo: DataTypes.BOOLEAN,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Ingresso',
        tableName: 'ingressos',
        paranoid: true,
        hooks: {
            beforeCreate: (ingresso) => {
                ingresso.preco = validaPreco(ingresso.preco);
            },
            beforeUpdate: (ingresso) => {
                ingresso.preco = validaPreco(ingresso.preco);
            }
        }
    });
    return Ingresso;
};