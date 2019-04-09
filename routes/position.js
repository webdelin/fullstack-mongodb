const express = require('express')
const controller = require('../controllers/position')
const router = express.Router()

//localhost:5000/api/position/all
router.get('/:categoryId', controller.getByCategoryId)

//localhost:5000/api/position/regidter
router.post('/', controller.create)

//localhost:5000/api/position/regidter
router.patch('/:id', controller.update)

//localhost:5000/api/position/regidter
router.delete('/:id', controller.remove)

module.exports = router
