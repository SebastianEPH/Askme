const express = require('express');
const router = express.Router();

const ques = require('../controller/controller_question')

// protege rutas
const {isLoggedIn, isNotLoggedIn, passIsTeacher, passIsStudent} = require('../lib/auth') // se usará en todas las listas qe se desea proteger

router.get('/add',  isLoggedIn,passIsTeacher, ques.get_add)
router.post('/add', isLoggedIn, passIsTeacher, ques.post_add)
router.get('/delete/:id', isLoggedIn, passIsTeacher, ques.get_delete)
router.get('/edit/:id', isLoggedIn, passIsTeacher,  ques.get_edit)
router.get('/view/:id', isLoggedIn, passIsTeacher, ques.view)
router.post('/view/:id', isLoggedIn, passIsTeacher, ques.view )
router.post('/update/:id', isLoggedIn,passIsTeacher, ques.post_update)
router.get('/', isLoggedIn, passIsTeacher, ques.get_show_onlyUser)
router.get('/all', isLoggedIn, passIsTeacher, ques.get_show_all )

module.exports = router;