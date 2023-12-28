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
const player = {} // this will be all things "this" player
let orbs = [] // this is a global for all non-player orbs
let players = [] // this is an array of all players

//put the modals into varables so we can interact with them
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'))
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'))

window.addEventListener('load', () => {
    //on page load, open the login modal
    loginModal.show()
})

document.querySelector('.name-form').addEventListener('submit', (e)=> {
    e.preventDefault()
    player.name = document.querySelector('#name-input').value
    document.querySelector('.player-name').innerHTML = player.name
    loginModal.hide()
    spawnModal.show()
})

document.querySelector('.start-game').addEventListener('click',(e)=> {
    //hide the start modal
    spawnModal.hide();
    //show the hidenOnStart elements
    const elArray = Array.from(document.querySelectorAll('.hiddenOnStart'))
    elArray.forEach(el=>el.removeAttribute('hidden'))
    init() // init is inside of socketStuff.js
})