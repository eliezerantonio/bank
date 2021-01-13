'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Moviments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            accountId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Accounts",
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            employeeId: {

                type: Sequelize.INTEGER,
                references: {
                    model: "Employees",
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            state: {
                allowNull:false,
                type: Sequelize.BOOLEAN,
                },
            balance: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            operation: {
                allowNull: false,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Moviments');
    }
};