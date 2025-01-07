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
        comentario: DataTypes.STRING,
        nota: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'FeedBack',
        tableName: 'feedbacks',
        paranoid: true,
    });
    return FeedBack;
};