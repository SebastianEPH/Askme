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
    passIsStudent(req, res, next){
        if (req.user.type_id === 2){
            console.log(req)
            console.log('Es estudiante')

            return next()
        }else{
            console.log('No es estudiante')
            //Mandar a renderizar acceso denegado
            return res.redirect('/profile')
        }
    },
    passIsTeacher(req, res, next){
        if (req.user.type_id === 1){
            console.log('Es docente')

            return next()
        }else{
            console.log('No es edocente')
            //Mandar a renderizar acceso denegado
            return res.redirect('/profile')
        }
    }



};