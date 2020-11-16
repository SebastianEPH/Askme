const express =  require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')
const addController = require('../controllers/addController')

router.get('/',mainController.list)
router.get('/add',addController.list)




// Export
module.exports = router;