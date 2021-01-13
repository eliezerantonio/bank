'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CardAccount extends Model {

        static associate(models) {

            this.belongsTo(models.Card, {
                    foreignKey: 'cardId',
                    targetKey: 'id',
                    as: 'Card'
                }),
                this.belongsTo(models.Account, {
                    foreignKey: 'accountId',
                    targetKey: 'id',
                    as: 'Account'
                })


        }

        static async getId(id) {
            return await CardAccount.findByPk(id);
        }

    };
    CardAccount.init({
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
        cardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Digite apenas numeros"
                },
                notNull: {
                    msg: 'O cardId deve ser informado.'
                },
                async isInCards(value) {
                    try {
                        const card = await this.sequelize.models.Card.getId(value)
                        if (!card) {
                            throw new Error('Cartão associado não pode ser encontrado');
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            },
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
    }, {
        sequelize,
        modelName: 'CardAccount',
    });
    return CardAccount;
};