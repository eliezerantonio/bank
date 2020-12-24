const Job = require('../models').Job
const errorRes = require('../responses/error_response')

module.exports = async(req, res, next) => {
    try {
        const jobId = parseInt(req.params.jobId ? req.params.jobId : req.params.id)

        const job = await Job.getId(jobId)

        if (job.userId !== req.body.user.id) {
            return errorRes(res, 400, 'Você não tem permissão para acessar esse recurso.')
        }

        req.body.jobId = jobId

        next()
    } catch (error) {
        console.log(error)
        return errorRes(res, 404, 'Job não encontrado.', error)
    }
}