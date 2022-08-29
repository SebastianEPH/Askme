const controller = {}
const pool = require('../database') // database import

controller.get_view_main = (req,res)=>{
    res.render('others/main')
}
controller.get_about = (req, res)=>{
    res.render('others/about')
}
controller.view_student = async (req, res)=>{
    const response = await pool.query('call sp_get_teacher_all()')
    res.render('list/students', {
        students: response[0],
    });
}
controller.view_teacher = async (req, res)=>{
    const response = await pool.query('call sp_get_teacher_all()')
    res.render('list/teacher', {
        teacher:response[0],
    });
}


module.exports = controller;