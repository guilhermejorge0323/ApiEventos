'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Organizador extends Model {
        static associate(models) {
            Organizador.hasMany(models.Evento,{
                foreignKey: 'organizador_id',
                onDelete: 'CASCADE'
            });
        }
    }
    Organizador.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Organizador',
        tableName: 'organizadores',
        paranoid: true
    });
    return Organizador;
};