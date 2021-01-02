'use strict';
const {
    Model,
    Op

} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Card extends Model {

        static associate(models) {

        }
        static async search(query) {
            const limit = query.limit ? parseInt(query.limit) : 500
            const offset = query.offset ? parseInt(query.offset) : 0

            let where = {}
                //filtrar por name
            if (query.name) where.name = {
                [Op.like]: `%${query.name}%`
            }

            const { rows, count } = await Card.findAndCountAll({
                where: where,
                limit: limit,
                offset: offset
            })

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
            return await Card.findByPk(id)
        }

    };
    Card.init({
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Card',
    });
    return Card;
};