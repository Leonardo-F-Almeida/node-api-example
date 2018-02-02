//external
const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
//internal
const UserDAL = require('./app/users/UserDAL')
const env       = process.env.NODE_ENV || 'development'
const config    = require('./config/config.json')[env]

const opts = {}
opts.secretOrKey = config.jwtSecret
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const strategy = new Strategy(opts, (payload, done) => {
    UserDAL.getById(payload.id).then(user => {
    if(user){
        return done(null, {
            id: user.id,
            email: user.email
        })
    }
    return done(null, false)
    }).catch(error => done(error, null))
})

passport.use(strategy)

module.exports = {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.jwtSession)
}