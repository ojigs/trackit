const todo = document.querySelectorAll('.todoItem')
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

//Set alternating background color for todo list
function setBg(e) {
    e.forEach(el => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        el.style.backgroundColor = '#' + randomColor
    })
}
setBg(todo)

//Add event listener to delete button
Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deleteTodo)
})

//Add event listener to not-completed todo
Array.from(todoItem).forEach(el => {
    el.addEventListener('click', deleteTodo)
})

//Add event listener to completed todo
Array.from(todoComplete).forEach(el => {
    el.addEventListener('click', deleteTodo)
})


//Handle delete
async function deleteTodo() {
    console.log('clicked')
    const todoId = this.parentNode.dataset.id
    console.log(todoId)
    try {
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}