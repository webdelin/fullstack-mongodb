const express = require('express')
const controller = require('../controllers/category')
const passport = require('passport')
const router = express.Router()

//localhost:5000/api/category/a
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

//localhost:5000/api/category/id
router.get('/:id', controller.getById)

//localhost:5000/api/category/delete
router.delete('/:id', controller.remove)

//localhost:5000/api/category/create
router.post('/', controller.create)

//localhost:5000/api/category/create
router.patch('/:id', controller.update)

module.exports = router
