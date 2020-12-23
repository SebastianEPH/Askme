const express = require('express');
const router = express.Router();
const pool = require('../database') // database import
const subpath = 'data_question'
// protege rutas
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth') // se usará en todas las listas qe se desea proteger

router.get('/add', isLoggedIn, (req, res)=>{
    res.render(subpath+'/add')
})
router.post('/add', isLoggedIn, async (req,res)=>{
    const {cat_id, lev_id, ty_id, que_que, que_1, que_2, que_3, que_4, que_true} = req.body;
    const newQuestion= {
        cat_id,
        lev_id,
        ty_id,
        que_que,
        que_1,
        que_2,
        que_3,
        que_4,
        que_true,
        user_id : req.user.user_id
    }
    await pool.query('INSERT INTO question SET ? ', [newQuestion]);
    req.flash('success', 'Se guardó la pregunta correctamente')
    res.redirect('/question')
})
router.get('/delete/:id', isLoggedIn,  async (req, res)=>{
    const {id} = req.params;
    console.log(req.params)
    await pool.query('DELETE FROM question WHERE que_id = ? ',[id])
    req.flash('success', 'Se eliminó la pregunta correctamente')
    res.redirect('/question')

})
router.get('/edit/:id', isLoggedIn,  async (req, res)=>{
    const {id} = req.params
    console.log(req.params)
    console.log([id])
    const question = await pool.query('SELECT * FROM question WHERE que_id = ?',[id]);
    console.log(question)
    res.render(subpath + '/edit',{
        question : question[0] //  question[0]
    })
})
router.post('/update/:id', isLoggedIn, async(req, res)=>{
    const {id} = req.params
    const data = req.body
    await pool.query('UPDATE question set ? WHERE que_id = ?', [data, id])
    req.flash('success', "Se editó la pregunta correctamente")
    res.redirect ('/question')
} )
router.get('/', isLoggedIn,  async (req,res)=>{
    const question = await pool.query('SELECT * FROM question WHERE  user_id = ?', [req.user.user_id])
    res.render(subpath+'/show',{
        question: question
    })
})

module.exports = router;