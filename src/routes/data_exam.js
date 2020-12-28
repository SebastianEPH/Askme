const express = require('express')
const router = express.Router();

const exam = require('../controller/controller_exam')

router.get('/', exam.get_view_only_user )
router.get('/all', exam.get_view_all )
router.get('/create', exam.get_create )
router.post('/create', exam.post_create )
router.get('/start/:id', exam.get_start)    // RunOnce
router.get('/start/:id:/:is_true', exam.get_start)  // muestra pregunta perot ambien
router.post('/start/:exam_id/:que_reply/:', exam.post_start)



module.exports = router;