const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const pool = require('../database')
const helpers = require('../lib/helpers');




passport.use('local.signup', new Strategy({
    usernameField: 'user_nick',
    passwordField: 'user_pass',
    passReqToCallback: true // Recibe el objeto requess dentro de esta función
},async (req, user_nick, user_pass, done )=>{ // Callback
    const {fullname} = req.body
    const  newUser = {
        user_nick,
        user_password: user_pass,
        user_fullname: fullname
    }
    newUser.user_password = await helpers.encryptPassword(user_pass)
    console.log(newUser)
    const result = await pool.query('INSERT INTO user SET ?', [newUser]);
    console.log(result)
    newUser.user_id = result.insertId
    return done(null, newUser)
}));


// Guarda en sesiones
passport.serializeUser((user, done)=>{
    done(null, user.user_id)    // Guarda id del usuario
})
passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('SELECT * FROM user WHERE user_id = ? ',[id]);  // Vuelve a optener los datos
    done(null, rows[0])
})
// referente a login e inicio de sesión



