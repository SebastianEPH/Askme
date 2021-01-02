const express = require('express')
const router = express.Router();

const exam = require('../controller/controller_exam')

router.get('/', exam.get_view_only_user )
router.get('/all', exam.get_view_all )
router.get('/create', exam.get_create )
router.get('/delete/:id', exam.get_delete )
router.post('/create', exam.post_create )
router.get('/start/:id', exam.get_start)    // RunOnce
router.get('/start/:id:/:is_true', exam.get_start)  // muestra pregunta perot ambien
router.post('/start/:que_current/:que_true/:que_true_reply/:que_false_reply/:exam_id/:exam_user_id', exam.post_start) // :


module.exports = router;