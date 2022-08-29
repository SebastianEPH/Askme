const controller = {}
const pool = require('../database') // database import
const passport = require('passport')
const helpers = require('../helpers/security/helpers');

controller.view_signup = async (req, res)=>{
    const faculties = await pool.query('SELECT faculty, code FROM faculties')
    const permissions = await pool.query('SELECT permission, code, description FROM permissions')
    console.table(faculties)
    res.render('auth/signup',{
        faculties,
        permissions
    })
}

controller.signup = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
})

controller.get_signin = (req, res) => {
    res.render('auth/signin')
}
controller.post_signin = (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
}
controller.get_profile = (req, res) => {
    res.render('profile');
}
controller.get_logout = (req, res) => {
    req.logOut();
    res.redirect('/signin')
}
controller.get_update_profile = async (req, res) => {
    const current_user = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.user_id])
    // const obj_faculty = await pool.query('SELECT * FROM user_faculty ')
    res.render('auth/update_profile', {
        data: current_user[0],
        obj_faculty: [] // modificado ahora
    });
}
controller.get_view_profile = async (req, res) => {
    const current_user = await pool.query('SELECT * FROM user WHERE user_id = ?', [req.user.user_id])
    const obj_faculty = await pool.query('SELECT * FROM user_faculty ')
    res.render('auth/view_profile', {
        data: current_user[0],
        obj_faculty
    });
}

controller.post_update = async (req, res) => {

    const {
        fullname,
        user_nick,
        user_pass,
        user_faculty,
        type_id,
        user_code,
        user_dni,
        genero,
        user_email,
        user_phone_prefijo,
        user_phone
    } = req.body;

    const update_user = {
        user_nick,
        user_fullname: fullname,
        user_email,
        user_code,
        user_dni,
        user_faculty,
        user_password: user_pass,
        user_phone: user_phone_prefijo + user_phone,
        type_id,
        user_is_male: genero
    }
    try {
        update_user.user_password = await helpers.encryptPassword(user_pass)
        await pool.query('UPDATE user set ? WHERE user_id = ?', [update_user, req.user.user_id])
        req.flash('success', 'Se actualizaron tus datos correctamente')
        res.redirect('/profile')
    } catch (e) {
        req.flash('warning', 'Ocurrió un error al actulizar tus datos')
    }


}


module.exports = controller;
