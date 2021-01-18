'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoryClient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Client, {
                    foreignKey: "clientId",
                    targetKey: "id",
                    as: "Client"

                }),
                this.belongsTo(models.Employee, {
                    foreignKey: 'employeeId',
                    targetKey: 'id',
                    as: 'Employee'
                })
        }
    };
    HistoryClient.init({
        description: DataTypes.STRING,
        clientId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER,



    }, {
        sequelize,
        modelName: 'HistoryClient',
    });
    return HistoryClient;
};