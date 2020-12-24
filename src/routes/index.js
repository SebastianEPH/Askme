const express = require('express')

const router = express.Router();

const main = require('../controller/controller_main')
router.get('/', main.get_view_main);
router.get('/about', main.get_about)

module.exports = router;