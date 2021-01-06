'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Loan extends Model {

        static associate(models) {

            this.belongsTo(models.Client, {
                    foreignKey: 'clientId',
                    targetKey: 'id',
                    as: 'Client'

                }),

                this.belongsTo(models.Employee, {
                    foreignKey: 'employeeId',
                    targetKey: 'id',
                    as: 'Employee'
                })
        }
        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 500
            const offset = query.offset ? parseInt(query.offset) : 0

            let where = {}
                //filtrar por name
            if (query.description) where.description = {
                [Op.like]: `%${query.description}%`
            }

            const { rows, count } = await Loan.findAndCountAll({
                where: where,
                limit: limit,
                offset: offset
            });

            return {
                entities: rows,
                meta: {
                    count: count,
                    limit: limit,
                    offset: offset
                }
            }

        }

        static async getId(id) {
            return await Loan.findByPk(id)
        }
    };
    Loan.init({
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            }

        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

        },
        termDate: {
            allowNull: false,
            type: DataTypes.DATE,
            validate: {
                notNull: {
                    msg: "Data do prazo do contrato não pode ser null"
                },
                isDate: {
                    msg: "Data invalida"
                },
                isBefore: {
                    args: "2003-01-01",
                    msg: "Clientes devem ser apenas maiores de idade"
                }
            },

        },
        valueDiscount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {

                min: 0,
                isNumeric: {
                    args: true,
                    msg: "Digite apenas numeros"

                },
                notNull: {
                    msg: "A data do prazo de validade deve ser informada"
                }
            }

        }
    }, {
        sequelize,
        modelName: 'Loan',
    });
    return Loan;
};