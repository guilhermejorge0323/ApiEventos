'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('participantes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nome: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            telefone: {
                type: Sequelize.STRING,
                unique: true
            },
            evento_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'eventos',
                    key: 'id'
                },
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('participantes');
    }
};