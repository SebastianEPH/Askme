const express = require('express')
const router = express.Router();

const exam = require('../controller/controller_exam')

router.get('/', exam.get_view_only_user )
router.get('/all', exam.get_view_all )
router.get('/create', exam.get_create )
router.post('/create', exam.post_create )
router.get('/start', exam.get_start)



module.exports = router;