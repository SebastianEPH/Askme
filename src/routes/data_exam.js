const express = require('express');
const router = express.Router();
const util = require('../helpers/util')
const exam = require('../controller/controller_exam');

// protege rutas
const {isLoggedIn, isNotLoggedIn, passIsTeacher, passIsStudent} = require('../lib/auth') // se usará en todas las listas qe se desea proteger
router.get('/', isLoggedIn,passIsTeacher, exam.get_view_only_user )
router.get('/all', isLoggedIn, exam.get_view_all )
router.get('/create', isLoggedIn,passIsTeacher,exam.get_create )
router.get('/delete/:id', isLoggedIn,passIsTeacher,exam.get_delete )
router.post('/create', isLoggedIn,passIsTeacher,exam.post_create )
router.get('/start/:id', isLoggedIn, exam.get_start)    // RunOnce
router.get('/start/:id:/:is_true', isLoggedIn,exam.get_start)  // muestra pregunta perot ambien
router.post('/start/:que_current/:que_true/:que_true_reply/:que_false_reply/:que_nothing_reply/:exam_id/:exam_user_id', isLoggedIn,exam.post_start) // :
router.get('/view/my', isLoggedIn,exam.get_view_my)
router.get('/view/student', isLoggedIn,passIsTeacher, exam.get_view_students)
router.get('/view/exam/id_:id/exam_:exam', isLoggedIn, exam.post_view_exam)
router.get('/test', (req, res)=>{

    const moment = require('moment')
    let current_date= new Date('2021-01-17 00:34:46')
    let only_date = current_date.getFullYear() + '-'+ (parseInt(current_date.getMonth()) +1 )+ '-'+current_date.getDate()
    let only_time = current_date.toLocaleTimeString()

    let fecha = new Date(only_date + " "+ only_time)

    let  fecha_1 = moment(fecha)
    console.log(fecha_1)

    let suma = fecha_1.add('1:00:0', 'hours')
    console.log(suma)

    /*
    // let fecha_2= moment('01:00:00')

    //let suma = fecha_1.diff(fecha_2, 'hours')
    let suma = fecha_1.add('2:45:1', 'hours')
    /*
    if(util.compare_date_init(fecha_inicio)){
        res.send('se cumplio')
    }else{
        res.send('no se cumpl')
    }
    console.log(fecha_1.toString()+'\n')
   // console.log(fecha_2.toString()+'\n')
    console.log(suma.toString()+'\n')
    */

    res.send('fdsfsd')


  //  res.send('false')




})






module.exports = router;