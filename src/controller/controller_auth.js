const controller = {}
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








module.exports = controller;
