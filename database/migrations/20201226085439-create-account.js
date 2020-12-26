'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            clientId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Clients',
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            balance: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            state: {
                allowNull: false,
                type: Sequelize.BOOLEAN
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Accounts');
    }
};