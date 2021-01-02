const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');

class ResourceController {

    constructor() {
        this.model = null;
    }

    setModel(model) {

        this.model = model;
    }
    bindMethod(method) {
        return this[method].bind(this)
    }

    //FIND ALL
    async index(req, res, next) {
        try {


            const {
                entities,
                meta
            } = await this.model.search(req.query);

            return successResponse(res, 200, null, entities, meta);


        } catch (error) {
            return errorResponse(res, 500, `Impossivel listar entidades de ${this.model.getTableName()}`, error)
        }
    }

    //FIND BY ID
    async show(req, res, next) {

        try {
            const entity = await this.model.getId(req.params.id);

            return successResponse(res, 200, null, entity)
        } catch (error) {
            console.log(error)
            return errorResponse(res, 404, `Não foi possivel recuperar entidade pelo id em ${this.model.getTableName()}`, error)


        }
    }

    //SAVE OR CREATE
    async store(req, res, next) {
        try {
            const entity = await this.model.create(req.body);
            return successResponse(res, 200, `Nova entidade incluida com sucesso em ${this.model.getTableName() }`, entity)

        } catch (error) {
            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

            } else if (error.name && error.name.includes("SequelizeUniqueConstraintError")) {
                return invalidResponse(res, 400, `Dados informados ja existentes `, error)
            }
            return errorResponse(res, 500, `Não foi possivel criar ${this.model.getTableName()} `, error)


        }

    }

    //UPDATE
    async update(req, res, next) {
        try {

            const entityOld = await this.model.getId(req.params.id);

            const entityNew = await entityOld.update(req.body);
            return successResponse(res, 200, `Entidade aualizada com sucesso em ${this.model.getTableName() }`, entityNew)

        } catch (error) {
            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

            }
            return errorResponse(res, 500, `Não foi possivel atualizar ${this.model.getTableName() }`, error)


        }


    }

    //REMOVE
    async remove(req, res, next) {
        try {
            const entity = await this.model.getId(req.params.id);
            if (!entity) {
                return errorResponse(res, 404, 'Não foi possivel recuperar entidade pelo id', error)
            }
            entity.destroy();
            return successResponse(res, 200, `Entidade removida com sucesso em ${this.model.getTableName() }`, null)
        } catch (error) {
            return errorResponse(res, 500, 'Erro servidor', error)

        }
    }

}


module.exports = ResourceController