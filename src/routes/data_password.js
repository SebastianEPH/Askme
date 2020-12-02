const express = require('express');
const router = express.Router();
const pool = require('../database') // database import
const subpath = 'data_password'
router.get('/add',(req, res)=>{
    res.render(subpath+'/add')
})

router.post('/add',(req,res)=>{
    res.send('received')
})

module.exports = router;