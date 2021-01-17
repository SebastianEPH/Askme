const express = require('express');
const router = express.Router();

const grap = require('../controller/controller_graphics')

// protege rutas
const {isLoggedIn, isNotLoggedIn, passIsTeacher, passIsStudent} = require('../lib/auth') // se usará en todas las listas qe se desea proteger

router.get('/all',  isLoggedIn,passIsTeacher, grap.get_all)
router.get('/my', isLoggedIn, grap.get_my)
router.get('/questions', isLoggedIn,  grap.get_questions)
router.get('/exam', isLoggedIn, passIsTeacher,  grap.get_exam)

module.exports = router;