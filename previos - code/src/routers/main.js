 const express =  require('express');
const router = express.Router();

const main = require('../controllers/mainController')
const CRUD = require('../controllers/CRUDController')
const info = require('../controllers/infoController')
const content = require('../controllers/contentController')

router.get('/',             main.main)
router.post('/',            main.checkNickname)

router.get('/add',          CRUD.add)
router.post('/save',        CRUD.save)
router.get('/delete/:id',   CRUD.del)
router.get('/edit/:id',     CRUD.edit)
router.post('/update/:id',  CRUD.update)
router.get('/show',         CRUD.show)


router.get('/start',        content.getStartListQuestion)
router.get('/response',       content.response)
router.post('/start/:id',   content.checkQuestion)

router.get('/about',        info.about)

//router.post('/nickname/:nick', mainController.nickname)    // El boton empezar
//router.get('/save',addController.save)



// Export
module.exports = router;