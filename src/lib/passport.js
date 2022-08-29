const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const pool = require('../database') // async
const helpers = require('../helpers/security/helpers');
const util = require('../helpers/util')

passport.use('local.signin', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Recibe el objeto requess dentro de esta función
}, async (req, email, password, done) => {
    const rows = await pool.query('call sp_get_users_one_from_email(?)', [email]);
    if (rows) {
        const user = rows[0][0];
        console.table(user)
        const isValidPassword = await helpers.matchPassword(password, user.password)
        if (isValidPassword) return done(null, user, req.flash('success', 'Inicio de sesión exitoso'))
        return done(null, false, req.flash('warning', 'La contraseña es incorrecta.'))
    }
    return done(null, false, req.flash('warning', 'El correo  ' + email + ' no existe'))
}));

passport.use('local.signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const {name, lastname, faculties_id, permissions_id, code, dni, is_male} = req.body;

    const ids = await pool.query('call sp_get_ids_faculty_and_permission_from_code(?, ?)', [faculties_id, permissions_id]);

    const user = {
        name,
        username: util.generateRandomStringLowercase(10, faculties_id+'_', permissions_id),
        email,
        password: await helpers.encryptPassword(password),
        lastname,
        faculties_id: ids[0][0].faculties_id ,
        permissions_id: ids[0][0].permissions_id,
        code,
        dni,
        is_male: is_male?is_male:1
    }
    const result = await pool.query('INSERT INTO users SET ?', [user]);
    user.id = result.insertId
    console.table(user)
    return done(null, user)
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('call sp_get_users_one_from_id(?)', [id]);
    done(null, rows[0][0])
})

