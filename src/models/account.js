'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {

        static associate(models) {

            this.belongsTo(models.Client, {
                foreignKey: "clientId",
                targetKey: "id",
                as: "Client"

            })
            this.hasMany(models.CardAccount, {
                as: 'CardAccounts'
            })

        }

        static async getId(id) {
            return await Account.findByPk(id, {
                include: [{
                    model: this.sequelize.models.CardAccount,
                    as: "CardAccounts",

                    include: [{
                        model: this.sequelize.models.Card,
                        as: "Card",

                    }]
                }]
            })
        }

        toJSON() {
            const values = Object.assign({}, this.get());

            return {
                id: values.id,
                clientId: values.clientId,
                state: values.state ? "Activo" : "Inactivo",
                balance: values.balance

            }
        }

    };
    Account.init({

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
        }
    }, {
        sequelize,
        modelName: 'Account',
    });
    return Account;
};