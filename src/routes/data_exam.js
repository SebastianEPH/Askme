const express = require('express');
const router = express.Router();

const exam = require('../controller/controller_exam');

router.get('/', exam.get_view_only_user )
router.get('/all', exam.get_view_all )
router.get('/create', exam.get_create )
router.get('/delete/:id', exam.get_delete )
router.post('/create', exam.post_create )
router.get('/start/:id', exam.get_start)    // RunOnce
router.get('/start/:id:/:is_true', exam.get_start)  // muestra pregunta perot ambien
router.post('/start/:que_current/:que_true/:que_true_reply/:que_false_reply/:que_nothing_reply/:exam_id/:exam_user_id', exam.post_start) // :


router.get('/test',async (req, res)=>{

    const pool = require('../database') // database import
    const moment = require('moment')
    const exam = await pool.query('SELECT * FROM exam WHERE is_show = 1', )
    const get_exam = {
        title: exam[0].title,
        commentary: exam[0].commentary,
        date_init: exam[0].date_init,
        date_finish: exam[0].date_finish,
        time_limit: exam[0].time_limit,
        cat_id: exam[0].cat_id,
        cant_ques : exam[0].cant_ques,
        ques_list : exam[0].ques_list,
        lev_id: exam[0].lev_id,
        user_id : exam[0].user_id
    }
    console.log(get_exam)

    let current_date = new Date()
    console.log('\n\n\n\n\n')
    console.log('Fecha limite: ' + get_exam.time_limit)
    console.log('Fecha inicio: ' + get_exam.date_init)
    console.log('Fecha final:  ' + get_exam.date_finish)
    console.log('Fecha actual: ' + current_date)

    const date_init = new Date(get_exam.date_init)
    const date_finish = new Date(get_exam.date_finish)
    const time_limit = new Date(get_exam.time_limit)



    if (current_date < date_init){
        console.log('si es mayor')
    }else{
        console.log('no es mayor')
    }

    console.log(current_date)
    console.log(current_date.getTime())
    console.log(current_date.valueOf())
    console.log(current_date.toDateString())
    console.log(current_date.getTimezoneOffset())
    console.log(date_init)
















    console.log('\n\n\n\n\n')

    res.send('is work: '     )
})

module.exports = router;