const express = require('express')
const router = express.Router()
const todosContoller = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosContoller.getTodos)

router.post('/createTodo', todosContoller.createTodo)

module.exports = router