var txtChat = document.querySelector('#chatbox textarea')
var btnChat = document.querySelector('#chatbox button')
var txtName = document.querySelector('#setName input')
var inputColor = document.querySelector('#chatbox input[type=color]')
var messagesDiv = document.querySelector('#messages')

txtName.focus()
txtName.onkeydown = event => {
  if (event.key == "Enter") {
    sendName()
  }
}
function sendName() {
  sock.s({
    action: "setName",
    name: txtName.value
  })
  txtName.value = ""
  var hiddenThings = document.querySelectorAll('.hidden')
  for (var thing of hiddenThings) {
    thing.classList.remove('hidden')
  }
  txtName.parentElement.classList.add("hidden")
}

function sendChat() {
  sock.s({
    action: "chat",
    msg: txtChat.value
  })
  addChat(myId, txtChat.value)
  txtChat.value = ""
}

function nameChange(id, name) {
  clients.find(c => c.id == id).name = name
}

function addChat(id, msg) {
  popCube(cubes[id])
  var client = clients.find(c => c.id == id)
  var myMessageClass = (id == myId ? 'class="mymsg"' : '')
  var myDate = (new Date()).toString().split(" GMT")[0]
  var template = `
  <div ${myMessageClass} style="background-color: ${client.color}">
    <div class="sender">${client.name}</div>
    <div class="message">${msg}</div>
    <div class="date">${myDate}</div>
  </div>
  `
  messagesDiv.innerHTML += template
}

document.querySelector('#chatbox').onclick = () => {
  txtChat.focus()
}

btnChat.onclick = sendChat

txtChat.onkeyup = event => {
  if (event.key == "Enter" && !event.shiftKey) {
    sendChat()
  }
}

inputColor.addEventListener('change', () => {
  sock.s({
    action: "setColor",
    color: inputColor.value
  })
})