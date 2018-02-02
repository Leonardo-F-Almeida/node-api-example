'use strict'

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    firstName : {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[2,255]
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[2,255]
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:true,
        len:[2,255]
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
  },
  {  hooks: {
      beforeCreate: user =>{
        const salt = bcrypt.genSaltSync()
        user.set('password',bcrypt.hashSync(user.password,salt))
      }
    }
  })

  user.isPassword = function(encodedPassword, password) {
    return bcrypt.compareSync(password,encodedPassword)
  }

  return user
}