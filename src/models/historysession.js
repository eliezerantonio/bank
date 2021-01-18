'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistorySession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HistorySession.init({
    idEmployee: DataTypes.INTEGER,
    description: DataTypes.STRING,
    clientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistorySession',
  });
  return HistorySession;
};