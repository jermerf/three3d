var sock = new WebSocket("ws://localhost:3000")
// var sock = new WebSocket("wss://three3d.herokuapp.com")
var clients = []
var myId = -1
sock.s = (obj) => {
  sock.send(JSON.stringify(obj))
}

sock.addEventListener('message', message => {
  var data = JSON.parse(message.data)

  switch (data.action) {
    case "myId":
      myId = data.id
      break
    case "client_connect":
    case "client_disconnect":
      clients = data.clients
      showCubesForClients()
      break
    case "colorChange":
      setCubeColor(data.id, data.color)
      break
    case "nameChange":
      nameChange(data.id, data.name)
      break
    case "chat":
      addChat(data.id, data.msg)
      break
  }
})

function showCubesForClients() {
  while (cubes.length > clients.length) {
    var cube = scene.children.pop()
    cubes.splice(cubes.indexOf(cube), 1)
  }
  for (var i = cubes.length; i < clients.length; i++) {
    var c = makeCube()
    c.position.x = 0.2 * i
    scene.add(c)
  }
  for (var i = 0; i < clients.length; i++) {
    cubes[i].material.color = new THREE.Color(clients[i].color)
  }
}

