const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const pool = require('../database') // async
const helpers = require('../lib/helpers');

passport.use('local.signin', new Strategy({
    usernameField: 'user_nick',
    passwordField: 'user_pass',
    passReqToCallback: true // Recibe el objeto requess dentro de esta función
}, async (req, user_nick, user_pass, done)=>{
    console.log(req.body)
    console.log(user_nick)
    console.log(user_pass)
    const rows = await pool.query('SELECT * FROM user WHERE user_nick = ?', [user_nick]);
    if(rows.length > 0){
        const user = rows[0];
        console.log(user)
        const validPassword = await helpers.matchPassword(user_pass, user.user_password)
        if(validPassword){
            done(null, user, req.flash('success', 'Inicio de sesión exitoso'))// + user.user_fullname))
        }else{
            done(null, false, req.flash('warning','La contraseña es incorrecta.'))
        }
    }else{
        return done(null, false, req.flash('warning','El usuario '+ user_nick + ' no existe' ))//'the username does not exists'))
    }
}));

passport.use('local.signup', new Strategy({
    usernameField: 'user_nick',
    passwordField: 'user_pass',
    passReqToCallback: true // Recibe el objeto requess dentro de esta función
},async (req, user_nick, user_pass, done )=>{ // Callback
    const {fullname, type_id, genero, user_email,  user_phone_prefijo, user_phone } = req.body;

    const newUser = {
        user_nick,
        user_fullname: fullname,
        user_email,
        user_password: user_pass,
        user_phone: user_phone_prefijo + user_phone,
        type_id,
        user_gen:genero
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
    const rows = await pool.query('SELECT * FROM user WHERE user_id = ? ', [id]);  // Vuelve a optener los datos
    done(null, rows[0])
})
// referente a login e inicio de sesión



