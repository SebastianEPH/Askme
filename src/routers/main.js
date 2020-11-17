const express =  require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/',mainController.list)
router.get('/add',mainController.add)
router.post('/save',mainController.save)
//router.get('/save',addController.save)




// Export
module.exports = router;