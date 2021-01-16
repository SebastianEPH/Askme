const controller = {}
const pool = require('../database') // database import
const passport = require('passport')
controller.get_signup = (req, res)=>{
    res.render('auth/signup')
}
controller.post_signup = passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
})

controller.get_signin = (req, res)=>{
    res.render('auth/signin')
}
controller.post_signin = (req,res, next )=>{

    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next )
}
controller.get_profile = (req, res)=>{
    res.render('profile');
}
controller.get_logout = (req, res)=>{
    req.logOut();
    res.redirect('/signin')
}
controller.get_update_profile = async (req, res)=>{
    const current_user = await pool.query('SELECT * FROM user WHERE user_id = ?' ,[req.user.user_id])
    const obj_faculty = await pool.query('SELECT * FROM user_faculty ')
    res.render('auth/update_profile', {
        data: current_user[0],
        obj_faculty
    });
}
controller.get_view_profile = async (req, res)=>{
    const current_user = await pool.query('SELECT * FROM user WHERE user_id = ?' ,[req.user.user_id])
    const obj_faculty = await pool.query('SELECT * FROM user_faculty ')
    res.render('auth/view_profile', {
        data: current_user[0],
        obj_faculty
    });
}






module.exports = controller;
