'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {


        await queryInterface.bulkInsert('Cards', [{
            description: 'Básico',

        }, {
            description: 'Internacional',

        }, {
            description: 'Gold'
        }, {
            description: 'Platinum',
        }], {});

    },

    down: async(queryInterface, Sequelize) => {


        await queryInterface.bulkDelete('Cards', null, {});

    }
};