const jwt        = require('jwt-simple')

const {user}    = require('../../models/index')
const env       = process.env.NODE_ENV || 'development'
const config    = require('../../config/config.json')[env]

const getAll = () => {
    return new Promise((resolve, reject) => {
        user.findAll({}).then((data) =>{
            resolve(data)
        }).catch(e => reject(e))
    })
}

const getById = (id) =>{
    return new Promise((resolve, reject) => {
        user.findOne( {where: {id} }).then((data) =>{
            resolve(data)
        }).catch(e => reject(e))
    })
}

const create = (params) => {
    return new Promise((resolve, reject) => {
        user.create(params).then((data) =>{
            console.log(data)
            resolve(data)
        }).catch(e => reject(e))
    })
}

const update = (id,params) => {
    return new Promise((resolve, reject) => {
        user.update(params, {where: {id} }).then((data) => {
            resolve(data)
        }).catch(e => reject(e))
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        user.destroy({where : {id}}).then((data) => {
            resolve(`Removed ${data} register(s)`)
        }).catch(e => reject(e))
    })
}

const auth = (params) => {
    let {email, password} = params
    
    return new Promise((resolve, reject) => {
        if(!email && !password) reject()

        user.findOne( {where: {email} }).then((data) =>{
            if(user.isPassword(data.password, password)){
                const payload = {id: data.id}
                resolve({token: jwt.encode(payload,config.jwtSecret)})
            }else{
               reject()
            }
        }).catch(e => reject(e))
    })
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    auth
}