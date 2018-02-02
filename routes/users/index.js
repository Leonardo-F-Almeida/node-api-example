const router     = require('express').Router()

const UserController = require('../../app/users/UserController')
const authorization = require('../../auth')

router.post('/users',(request,response) => {
    UserController.create(request.body).then((data) => {
        response.status(200).send(data)
    }).catch(e => response.status(400).send(e.toString()))
})

router.post('/users/auth',(request,response) => {
    UserController.auth(request.body).then((data) => {
        response.status(200).send(data)
    }).catch(e => response.sendStatus(401))
})

router.get('/users', authorization.authenticate(), (request,response) =>{
    UserController.getAll().then((data) => {
        response.status(200).send(data)
    }).catch(e =>response.status(400).send(e.toString()))
})

router.get('/users/:id', authorization.authenticate(), (request,response) =>{
    UserController.getById(request.params.id).then((data) => {
        response.status(200).send(data)
    }).catch(e =>response.status(400).send(e.toString()))
})

router.put('/users/:id', authorization.authenticate(), (request,response) =>{
    UserController.update(request.params.id, request.body).then((data) => {
        response.status(200).send(data)
    }).catch(e =>response.status(400).send(e.toString()))
})

router.delete('/users/:id',authorization.authenticate(), (request,response) =>{
    UserController.remove(request.params.id).then((data) => {
        response.status(200).send(data)
    }).catch(e => response.status(400).send(e.toString()))
})

module.exports = router