'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoryLoan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

    };
    HistoryLoan.init({
        clientId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'HistoryLoan',
    });
    return HistoryLoan;
};