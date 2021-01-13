'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {


        await queryInterface.bulkInsert('Cards', [{
            description: 'Básico',
            state:true

        }, {
            description: 'Internacional',
            state:true

        }, {
            description: 'Gold',
            state:true
        }, {
            description: 'Platinum',
            state:true
        }], {});

    },

    down: async(queryInterface, Sequelize) => {


        await queryInterface.bulkDelete('Cards', null, {});

    }
};