'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('feedbacks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            comentario: {
                type: Sequelize.STRING
            },
            nota: {
                type: Sequelize.INTEGER
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
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('feedbacks');
    }
};