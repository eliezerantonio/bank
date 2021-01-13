'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('CardAccounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            accountId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Accounts',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            cardId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cards',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            balance: {
                type: Sequelize.DOUBLE,

                allowNull: false,
            },
            state: {
                allowNull:false,
                type: Sequelize.BOOLEAN,
                },
            state: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
        await queryInterface.dropTable('CardAccounts');
    }
};