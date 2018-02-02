const UserDAL = require('./UserDAL')

const User = {
    
    getAll() {
        return new Promise((resolve, reject) => {
            UserDAL.getAll().then((data)=>{
                resolve(data)
            }).catch(e => reject(e))
        })
    },

    getById(id){
        return new Promise((resolve, reject) => {
            UserDAL.getById(id).then((data)=>{
                resolve(data)
            }).catch(e => reject(e))
        }) 
    },

    create(params) {
        return new Promise((resolve,reject) =>{
            UserDAL.create(params).then((data)=>{
                resolve(data)
            }).catch(e => reject(e))
        })
    },

    update(id,params){
        return new Promise((resolve,reject) =>{
            UserDAL.update(id,params).then((data)=>{
                resolve(data)
            }).catch(e => reject(e))
        })
    },

    remove(id){
        return new Promise((resolve,reject) =>{
            UserDAL.remove(id).then((data)=>{
                resolve(data)
            }).catch(e => reject(e))
        })
    },

    auth(params){
        return new Promise((resolve,reject) =>{
            UserDAL.auth(params).then((data)=>{
                resolve(data)
            }).catch(e => reject(e))
        })
    }

}

module.exports = User