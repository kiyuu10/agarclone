const init = () => {
    //draw()
}

let randomX = Math.floor(500 * Math.random() + 10)
let randomY = Math.floor(500 * Math.random() + 10)

context.beginPath()
context.fillStyle = 'rgb(255,0,0'
context.arc(randomX, randomY, 10, 0, Math.PI*2) // draw an arc/circle
//arg1 and arg2 are center x and centery of the arc
//arg3 = radius of the circle
//arg4 = where to start drawing in radians - 0 = 3:00
//arg5 = where to stop drawing in radians - PI = 90deg

context.fill()
context.lineWidth = 3
context.strokeStyle = 'rgb(0,255,0)' // draw a green line
context.stroke() // draw the line (border)


//==========DRAW============
const draw = () => {
    
}