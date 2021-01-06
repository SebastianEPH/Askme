const express = require('express')

const router = express.Router();

const main = require('../controller/controller_main')
router.get('/', main.get_view_main);
router.get('/about', main.get_about);
router.get('/view/student', main.view_student );
router.get('/view/teacher', main.view_teacher);

module.exports = router;