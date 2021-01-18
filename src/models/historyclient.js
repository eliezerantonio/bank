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
    clientId:
     {
     type:DataTypes.INTEGER,
     allowNull:false,
     validate: {
      isNumeric: {
          msg: "Digite apenas numeros"
      },
      notNull: {
          msg: 'O userId deve ser informado.'
      },
      async isInClients(value) {
          try {
              const client = await this.sequelize.models.Client.getId(value)
              if (!client) {
                  throw new Error('Usuario associado não pode ser encontrado');
              }
          } catch (error) {
              throw error;
          }
      }
  },
      },
    employeeId:{ 
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isNumeric: {
            msg: "Digite apenas numeros"
        },
        notNull: {
            msg: 'O userId deve ser informado.'
        },
        async isInEmployee(value) {
            try {
                const client = await this.sequelize.models.Employee.getId(value)
                if (!client) {
                    throw new Error('Usuario associado não pode ser encontrado');
                }
            } catch (error) {
                throw error;
            }
        }
    }
    
    }
  }, {
    sequelize,
    modelName: 'HistoryClient',
  });
  return HistoryClient;
};