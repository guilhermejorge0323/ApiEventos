'use strict';
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
        tipo: DataTypes.STRING,
        preco: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Ingresso',
        tableName: 'ingrressos',
        paranoid: true,
    });
    return Ingresso;
};