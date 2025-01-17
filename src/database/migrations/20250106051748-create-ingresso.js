'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ingressos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tipo: {
                type: Sequelize.STRING
            },
            preco: {
                type: Sequelize.STRING
            },
            ativo: {
                type: Sequelize.BOOLEAN
            },
            participante_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'participantes',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            evento_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'eventos',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ingressos');
    }
};