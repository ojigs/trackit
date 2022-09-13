const Todo  = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find({ userId: req.user.id })
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, title: 'Todos'})
        } catch (error) {
            console.log(error)
        }
    },

    createTodo: async (req, res) => {
        try {
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added')
            res.redirect('/todos')
        } catch (error) {
            console.log(error)
        }
    },

    deleteTodo: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Todo.findOneAndDelete({_id: req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted it')
        } catch (error) {
            console.log(error)
        }
    }, 

    
}