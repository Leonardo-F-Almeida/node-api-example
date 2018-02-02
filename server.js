//requires externos
const bodyParser = require('body-parser')
const express    = require('express')

//requires internos
const routes = require('./routes')
const authorization = require('./auth')
const server = express()
const port = process.env.PORT || 3000

server.use(bodyParser.json({limit: '20mb'}))
server.use(bodyParser.urlencoded({limit: '20mb', extended: true}))

server.use(authorization.initialize())

server.use('/',...routes)

server.listen(port, () =>{
    console.log(`App is running on port ${port}`)
})