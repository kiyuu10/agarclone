// Where all our socket sutff will go
const io = require('../servers').io
//we need express, get app, but only put what we need to inside of out socket stuff
const app = require('../servers').app

// ================ CLASS ====================
const Player = require('./classes/Player')
const PlayerConfig = require('./classes/PlayerConfig')
const PlayerData = require('./classes/PlayerData')
const Orb = require('./classes/Orb')
// ==========================================

//make an orbs array that will host all 500/5000 NOT PLAYER orbs.
//every time one is absorb, the server will make a new one
const orbs = []
const settings = {
    defaultNumberOfOrbs: 500, //number of orbs on the map
    defaultSpeed: 6, //player speed
    defaultSize: 6, // default players speed
    defaultZoom: 1.5, //as the player gets bigger, zoom needs to go out
    worldWidth: 500,
    worldHeight: 500,
    defaultGenericOfSize: 5 //smaller than player orbs
}

const players = []
let tickTockInterval

//on server start, to make our initial defaultNumberOfOrbs
initGame()

io.on('connect', (socket) => {
    // a player has connected
    let player = {}
    socket.on('init', (playerObj, ackCallback) => {

        if (players.length === 0) { //someone is about to be added to players. Start tick-tocking
            //tick-tock - issue an event to EVERY connected socket, that is playing the game, 30 times per second
            tickTockInterval = setInterval(() => {
                io.to('game').emit('tick', players) // send the event to the "game" room
            }, 33) // 1000/30 = 33.33333, there are 33, 30's in 1000 milliseconds, 1/30th of a second, or 1 of 30fps
        }

        socket.join('game') //add this socket to "game" room
        //event that runs on join that does init name stuff
        // make a playerConfig object - the data specific to this player that only the player needs to know
        const playerName = playerObj.playerName
        const playerConfig = new PlayerConfig(settings)
        const playerData = new PlayerData(playerName, settings)
        player = new Player(socket.id, playerConfig, playerData)
        players.push(player)
        // make a playerConfig object - the data specific to this player that everyone needs to khow
        // a master player object to house both
        ackCallback(orbs) // send orbs array back as an ack function!
    })


    //the client sent over a tock!
    socket.on('tock', (data) => {
        const speed = player.playerConfig.speed
        const xV = player.playerConfig.Vector = data.xVector;
        const yV = player.playerConfig.yVector = data.yVector;

        if ((player.playerData.locX < 5 && player.playerData.xV < 0) || (player.playerData.locX > 500) && (xV > 0)) {
            player.playerData.locY -= speed * yV;
        } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)) {
            player.playerData.locX += speed * xV;
        } else {
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })

    socket.on('disconnect', () => {
        //check to see if players is empty. If so, stop "ticking"
        if (players.length === 0) {
            clearInterval(tickTockInterval)
        }
    })

})

function initGame() {
    //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
    for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
        orbs.push(new Orb(settings))
    }
}