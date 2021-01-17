const express = require('express')

const router = express.Router();

// protege rutas
const {isLoggedIn, isNotLoggedIn, passIsTeacher, passIsStudent} = require('../lib/auth') // se usará en todas las listas qe se desea proteger
const main = require('../controller/controller_main')
router.get('/', main.get_view_main);
router.get('/about', main.get_about);
router.get('/view/student',isLoggedIn, main.view_student );
router.get('/view/teacher',isLoggedIn, main.view_teacher);

module.exports = router;