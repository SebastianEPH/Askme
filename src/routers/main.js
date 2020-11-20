const express =  require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/',         mainController.main)
router.post('/',         mainController.nickname)
router.get('/add',      mainController.add)
router.post('/save',    mainController.save)
router.get('/delete/:id',   mainController.delete)
router.get('/update/:id',   mainController.update)
router.post('/update/:id',   mainController.update)
router.get('/show',     mainController.show)
router.get('/about',    mainController.about)

router.get('/game/:nickname/:cantidad/:level',    mainController.game)


//router.post('/nickname/:nick', mainController.nickname)    // El boton empezar
//router.get('/save',addController.save)




// Export
module.exports = router;