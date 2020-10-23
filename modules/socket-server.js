const ws = require('ws')

var wss = null

function sendToAllClients(data, ignoreSocket) {
  for (var c of wss.clients) {
    if (c == ignoreSocket) continue
    c.send(JSON.stringify(data))
  }
}

function init() {
  wss.on('connection', socket => {
    newConnection(socket)

    socket.on('message', message => {
      var data = JSON.parse(message)
      switch (data.action) {
        case "setName":
          setName(socket, data.name)
          break
        case "chat":
          gotChat(socket, data.msg)
          break
        case "setColor":
          setColor(socket, data.color)
          break
      }
    })
    socket.on('close', () => {
      var clientIndex = clients.indexOf(clients.find(c => c.socket == socket))
      clients.splice(clientIndex, 1)

      sendToAllClients({
        action: "client_disconnect",
        clients: publicClients()
      })
    })
  })
}


var clients = []
function publicClients() {
  return clients.map(c => ({ id: c.id, name: c.name, color: c.color }))
}

function newConnection(socket) {
  var client = {
    id: clients.length,
    name: "",
    color: "#ffaabb",
    socket
  }
  clients.push(client)
  socket.send(JSON.stringify({
    action: "myId",
    id: client.id
  }))
  sendToAllClients({
    action: "client_connect",
    clients: publicClients()
  })
}

function setName(socket, name) {
  var client = clients.find(c => c.socket == socket)
  client.name = name

  sendToAllClients({
    action: "nameChange",
    id: client.id,
    name
  })
}
function setColor(socket, color) {
  var client = clients.find(c => c.socket == socket)
  client.color = color

  sendToAllClients({
    action: "colorChange",
    id: client.id,
    color
  })
}

function gotChat(socket, msg) {
  var client = clients.find(c => c.socket == socket)
  sendToAllClients({
    action: "chat",
    id: client.id,
    msg
  }, socket)
}
module.exports = (server) => {
  wss = new ws.Server({
    server
  })
  init()
}