const express = require('express')

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('others/main')
});
router.get('/about',(req, res)=>{
    res.render('others/about')
})

module.exports = router;