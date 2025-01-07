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
            });

            Participante.hasMany(models.FeedBack,{
                foreignKey: 'participante_id',
                onDelete: 'CASCADE',
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
    return Participante;
};