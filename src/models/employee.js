'use strict';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = 'DSFGSD453435kjhkjgsdgfhdfg%&¨*#¨$%#sdgfsd';
const {
    Model,
    Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {

        static associate(models) {
            // define association here
        }
        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 20;
            const offset = query.offset ? parseInt(query.limit) : 0

            let where = {}

            if (query.name) where.name = {
                [Op.like]: `%${query.name}%`

            }
            if (query.email) where.email = q.query.email;

            const entities = await Employee.findAndCountAll({
                where: where,
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
        static async getId(id) {
            return await Employee.findByPk(id, {
                /*  include: [{
                    model: this.sequelize.models.EmployeeSkill,
                    as: "Contas",

                    include: [{
                        model: this.sequelize.models.Skill,
                        as: "Conta",

                    }]
                }]*/
            })
        }
        static async verifyLogin(email, password) {
            try {
                let employee = await Employee.findOne({
                    where: {
                        email: email
                    }
                });
                if (!employee) {
                    throw new Error("Email nao enontrado");
                }
                if (!bcrypt.compareSync(password, employee.password)) {
                    throw new Error("Senha nao confere");
                }

                //verificar se usuario esta logado
                let token = jwt.sign({
                    id: employee.id
                }, SECRET, {
                    expiresIn: '1d'
                })

                return {
                    employee: employee,
                    token: token
                }
            } catch (error) {
                throw error;

            }

        }
        static async verifyToken(token) {
                return await jwt.verify(token, SECRET)
            }
            //sconde
        toJSON() {
            const values = Object.assign({}, this.get());
            delete values.password;
            return values;
        }
    };
    Employee.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/],
                    msg: "O nome de conter apenas caracteres de A-Z"
                },
                len: {
                    args: [6, 20],
                    msg: "Nome: Minimo deve conter 6 caracteres"
                },
                contains: {
                    args: ' ',
                    msg: "Nome: deve conter espaco"
                },

                notNull: {
                    msg: "Nome: deve ser informado"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {

                msg: "E-mail informado ja existe no sistema"
            },

            validate: {
                notNull: {
                    msg: "E-mail dever informado"
                },
                isEmail: {
                    msg: "E-mail val"
                }
            }

        },
        password: {
            type: DataTypes.STRING,
            is: {
                args: ["^[a-z]+$", 'i'],
                msg: "Genero: digite caracteres de A-Z"
            },
            isAlphanumeric: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A senha dever informada"
                }
            }

        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                isAlphanumeric: {

                    msg: "Genero: digite caracteres de A-Z"
                },
                len: {
                    args: [7, 10],
                    msg: "Genero: No minimo deve conter  7 caracteres"
                },
                notNull: {
                    msg: "Genero: deve ser informado"
                }
            }
        },
        accessLevel: {
            defaultValue: 0,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Employee',
        hooks: {
            beforeSave: (employee, options) => {
                try {
                    bcrypt.getRounds(employee.password)
                } catch (error) {
                    employee.password = bcrypt.hashSync(employee.password, 10)
                }
            }
        }
    });
    return Employee;
};