const express = require('express');
const router = express.Router();
const pool = require('../database') // database import
const subpath = 'data_question'
router.get('/add',(req, res)=>{
    res.render(subpath+'/add')
})

router.post('/add',async (req,res)=>{
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
        que_true
    }
    await pool.query('INSERT INTO question SET ? ', [newQuestion]);
    res.redirect('/question')
})
router.get('/edit/:id', async (req, res)=>{
    const {id} = req.params
    console.log(req.params)
    console.log([id])
    const question = await pool.query('SELECT * FROM question WHERE que_id = ?',[id]);
    console.log(question)
    res.render(subpath + '/edit',{
        question : question[0] //  question[0]
    })
})
router.get('/edit',(req, res)=>{
    res.send('está corriendo / edit ')
} )
router.get('/', async (req,res)=>{
    const question = await pool.query('SELECT * FROM question')
    res.render(subpath+'/show',{
        question: question
    })
})

router.get('/delete/:id', async (req, res)=>{
    const {id} = req.params;
    console.log(req.params)
    await pool.query('DELETE FROM question WHERE que_id = ? ',[id])
    res.redirect('/question')

})
module.exports = router;