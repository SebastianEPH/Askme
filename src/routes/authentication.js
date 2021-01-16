const express = require('express');
const router = express.Router();

const auth = require('../controller/controller_auth')
// protege rutas
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth') // se usará en todas las listas qe se desea proteger
router.get('/signup', isNotLoggedIn, auth.get_signup)
router.post('/signup', isNotLoggedIn, auth.post_signup )
router.get('/signin', isNotLoggedIn, auth.get_signin)
router.post('/signin', isNotLoggedIn, auth.post_signin )
router.get('/profile',isLoggedIn, auth.get_profile)
router.get('/logout',isLoggedIn, auth.get_logout)
router.get('/profile/update',isLoggedIn, auth.get_update_profile)
router.get('/profile/view',isLoggedIn, auth.get_view_profile)


module.exports = router;