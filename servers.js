const express = require('express')
const socketio = require('socket.io')
const app = express()
 
app.use(express.static(__dirname+'/public'))
const expressServer = app.listen(9000)
const io = socketio(expressServer)

io.on('connection',(socket)=> {
    socket.on('event',()=>{})
})

//App organization
//Servers.js is NOT the entry point. it creates our servers
//and  exports them
module.exports = {
    app,
    io
}