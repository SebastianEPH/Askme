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
    },
    isStudent(req, res, next){
        if (req.user.type_id === 2){
            console.log('Es estudiante - acceso permitido')
            //Mandar a renderizar acceso denegado
            return next()
        }else{
            console.log('No es estudiante, no puedes acceder')
        }
    },
    isTeacher(req, res, next){
        if (req.user.type_id === 1){
            console.log('Es docente - acceso permitido')
            //Mandar a renderizar acceso denegado
            return next()
        }else{
            console.log('No es edocente, no puedes acceder')
        }
    }



};