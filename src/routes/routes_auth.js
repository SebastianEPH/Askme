const express = require('express');
const router = express.Router();

const auth = require('../controller/controller_auth')
// protege rutas
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth') // se usará en todas las listas qe se desea proteger
router.get('/signup',  auth.view_signup) // isNotLoggedIn,
router.post('/signup', auth.signup ) //  isNotLoggedIn,

router.get('/signin',  auth.get_signin) // isNotLoggedIn,
router.post('/signin', auth.post_signin ) // isNotLoggedIn,


router.get('/profile',isLoggedIn, auth.get_profile)
router.get('/logout', auth.get_logout) // isLoggedIn,
router.get('/profile/update',isLoggedIn, auth.get_update_profile)
router.post('/profile/update/start',isLoggedIn, auth.post_update)
router.get('/profile/view',isLoggedIn, auth.get_view_profile)


module.exports = router;