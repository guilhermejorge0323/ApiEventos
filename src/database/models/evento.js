'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Evento extends Model {
        static associate(models) {
            Evento.hasMany(models.Participante, {
                foreignKey: 'evento_id',
                onDelete: 'CASCADE'
            });

            Evento.hasMany(models.Ingresso,{
                foreignKey: 'evento_id',
                onDelete: 'CASCADE'
            });

            Evento.hasMany(models.FeedBack,{
                foreignKey: 'evento_id',
                onDelete: 'CASCADE'
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
    return Evento;
};