const http = require('http')
const path = require('path')
const express = require('express')
const socketServer = require('./modules/socket-server.js')

const PORT = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
socketServer(server)

app.use(express.static(path.join(__dirname, "public")))

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))