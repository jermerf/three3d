const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 3000
var app = express()

app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))