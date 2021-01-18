'use strict';
const {
    Model,
    Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Moviment extends Model {

        static associate(models) {

            this.belongsTo(models.Account, {
                    foreignKey: 'accountId',
                    targetKey: 'id',
                    as: 'Account'

                }),

                this.belongsTo(models.Moviment, {

                    foreignKey: 'EmployeeId',
                    targetKey: 'id',
                    as: 'Employee'
                })

        }


        static async search(query) {

            const limit = query.limit ? parseInt(query.limit) : 20;
            const offset = query.offset ? parseInt(query.limit) : 0

            let where = {}

            if (query.accountId) where.accountId = {
                [Op.like]: `%${query.accountId}%` //filtrando pelo nome

            }


            const entities = await Moviment.findAndCountAll({
                where: {
                    accountId: query
                },
                limit: limit,
                offset: offset
            })

            return {
                entities: entities.rows,
                meta: {
                    count: entities.count,
                    limit: limit,
                    offset: offset
                }
            };
        }

    };
    Moviment.init({

        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Digite apenas numeros"
                },
                notNull: {
                    msg: 'O userId deve ser informado.'
                },
                async isInCards(value) {
                    try {
                        const client = await this.sequelize.models.Account.getId(value)
                        if (!client) {
                            throw new Error('Usuario associado não pode ser encontrado');
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            },
        },
        employeeId: {
            type: DataTypes.INTEGER,
        },
        balance: {
            type: DataTypes.DOUBLE,
            allowNull: false,

            validate: {

                min: 0,
                isNumeric: {
                    args: true,
                    msg: "Digite apenas numeros"

                },
                notNull: {
                    msg: "O Saldo deve ser informado"
                }
            }
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            validate: {
                isIn: {
                    args: [
                        [
                            false, //
                            true, //Básico

                        ]
                    ],
                    msg: 'São aceitos apenas dois estados 0-Nao activo 1 - Activo,'
                }
            }
        },
        operation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 1],
                    msg: "Operacao: No minimo deve conter  apenas um  caracter"
                },
                notNull: {
                    msg: "Operacao: deve ser informado"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Moviment',
    });
    return Moviment;
};