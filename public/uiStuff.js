//set height and width of canvas = window
let wHeight = window.innerHeight
let wWidth = window.innerWidth

//canvas element needs to be in a variable
const canvas = document.querySelector('#the-canvas')

//context is how we draw! we will be drawing in 2d
const context = canvas.getContext('2d')

//set the canvas height and width to = window height and width
canvas.height = wHeight
canvas.width = wWidth

window.addEventListener('load', () => {
    //on page load, open the login modal
    const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'))
    loginModal.show()
})

document.querySelector('.name-form').addEventListener('submit', (e)=> {
    e.preventDefault()
    
})