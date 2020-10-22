var sock = new WebSocket("wss://three3d.herokuapp.com")

sock.addEventListener('message', message => {
  var data = JSON.parse(message.data)

  switch (data.action) {
    case "client_connect":
    case "client_disconnect":
      showCubesForSockets(data.count)
      break
    case "message":
      console.log("SOCKETMESSAGE", data.message)
      break
  }
})

function showCubesForSockets(socks) {
  while (scene.children.length > socks) {
    scene.children.pop()
  }
  for (var i = scene.children.length; i < socks; i++) {
    var c = makeCube()
    c.position.x = 0.2 * i
    scene.add(c)
  }
}