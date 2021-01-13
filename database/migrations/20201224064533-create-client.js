'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Clients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            genre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            isEmployee: {
                allowNull: false,
                type: Sequelize.BOOLEAN,

            },
            state: {
                allowNull:false,
                type: Sequelize.BOOLEAN,
                },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            bi: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            birthDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Clients');
    }
};