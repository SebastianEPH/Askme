const express = require('express');
const router = express.Router();

const exam = require('../controller/controller_exam');

// protege rutas
const {isLoggedIn, isNotLoggedIn, passIsTeacher, passIsStudent} = require('../lib/auth') // se usará en todas las listas qe se desea proteger
router.get('/', isLoggedIn,passIsTeacher, exam.get_view_only_user )
router.get('/all', isLoggedIn, exam.get_view_all )
router.get('/create', isLoggedIn,passIsTeacher,exam.get_create )
router.get('/delete/:id', isLoggedIn,passIsTeacher,exam.get_delete )
router.post('/create', isLoggedIn,passIsTeacher,exam.post_create )
router.get('/start/:id', isLoggedIn, exam.get_start)    // RunOnce
router.get('/start/:id:/:is_true', isLoggedIn,exam.get_start)  // muestra pregunta perot ambien
router.post('/start/:que_current/:que_true/:que_true_reply/:que_false_reply/:que_nothing_reply/:exam_id/:exam_user_id', isLoggedIn,exam.post_start) // :
router.get('/view/my', isLoggedIn,exam.get_view_my)
router.get('/view/student', isLoggedIn,passIsTeacher, exam.get_view_students)
router.get('/view/exam/id_:id/exam_:exam', isLoggedIn, exam.post_view_exam)







module.exports = router;