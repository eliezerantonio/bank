var express = require('express');
var router = express.Router();

const MovimentsController = require('../controllers/moviment_controllers');
const verifyAccessToken = require('../middlewares/verifyAccessToken_middleware')

const verifyOwner = require('../middlewares/verifyOwner_middleware')
    /*

            const upload = require('./middlewares/upload_middleware')
       */
const onlyAllowsOwner = [verifyAccessToken, verifyOwner]


router.get('/:id', verifyAccessToken, MovimentsController.movimentFindById);





module.exports = router;