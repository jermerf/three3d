const ws = require('ws')


var wss = null

function sendToAllClients(data) {
  for (var c of wss.clients) {
    c.send(JSON.stringify(data))
  }
}

function init() {
  wss.on('connection', socket => {
    console.log("Socket Connected")
    sendToAllClients({
      action: "client_connect",
      count: wss.clients.size
    })

    socket.on('close', () => {
      console.log("Socket closed");
      sendToAllClients({
        action: "client_disconnect",
        count: wss.clients.size
      })
    })

  })

}

module.exports = (server) => {
  wss = new ws.Server({
    server
  })
  init()
}