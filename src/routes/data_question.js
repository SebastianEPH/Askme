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
router.get('/', async (req,res)=>{
    const question = await pool.query('SELECT * FROM question')
    res.render(subpath+'/show',{
        question: question
    })
})

module.exports = router;