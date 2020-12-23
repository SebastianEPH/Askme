module.exports ={
    isLoggedIn(req, res, next){ // Evita rutas cuando el usuario no está logeado
        if(req.isAuthenticated()){
           return next()
        }else{
            return res.redirect('/signin')
        }
    },
    isNotLoggedIn(req, res, next){  // Evitar rutas cuando el suuario ya está loggeado
        if (req.isAuthenticated()){
            return res.redirect('/profile')
        }else{
            return next()
        }
    }



};