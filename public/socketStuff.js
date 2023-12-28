const socket = io.connect('http://localhost:9000')

const init = async() => {
    // init is called inside of start-game click listener
    const initOrb = await socket.emitWithAck('init', {
        playerName: player.name
    })
    //out await has resolved, so start 'tocking'
    setInterval(() => {
        socket.emit('tock', {
            xVector: player.xVector,
            yVector: player.yVector
        })
    }, 33)

    console.log(initOrb)
    orbs = initOrb
    // init is called inside of start-game click
    draw()
}

socket.on('tick', (playersArray) => {
    console.log(playersArray)
    players = playersArray
})