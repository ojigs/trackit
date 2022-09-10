const Todo  = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find({ userId: req.user.id })
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            res.render('todos', {todo: todoItems, user: req.user})
        } catch (error) {
            console.log(error)
        }
    },
}