'use strict';
const {
    Model
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
                    foreignKey: 'movimentId',
                    targetKey: 'id',
                    as: 'moviment'
                })

        }

        static async verifyMoviment(accountId) {
            try {
                let moviment = await Moviment.findOne({
                    where: {
                        accountId: accountId
                    }
                });


                if (!moviment) {
                    throw new Error("Conta nao encontrada");
                }
                return {
                    moviment: moviment,
                }
            } catch (error) {
                throw error;

            }
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