'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FeedBack extends Model {
        static associate(models) {
            FeedBack.belongsTo(models.Evento,{
                foreignKey: 'evento_id',
            });

            FeedBack.belongsTo(models.Participante,{
                foreignKey: 'participante_id',
            });
        }
    }
    FeedBack.init({
        comentario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'O campo comentário não pode estar vazio'
                },
                len: {
                    args: [3,500],
                    msg: 'O comentario deve ter entre 3 e 500 caracteres'
                }
            }
        },
        nota: {
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'O valor minimo e 0'
                },
                max: {
                    args: [5],
                    msg: 'O valor maximo e 5'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'FeedBack',
        tableName: 'feedbacks',
    });
    return FeedBack;
};