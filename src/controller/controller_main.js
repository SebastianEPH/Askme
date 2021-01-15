const controller = {}
const pool = require('../database') // database import

controller.get_view_main = (req,res)=>{
    res.render('others/main')
}
controller.get_about = (req, res)=>{
    res.render('others/about')
}
controller.view_student = async (req, res)=>{
    const students = await pool.query('SELECT * FROM user WHERE type_id = 2 ')
    const obj_faculty = await pool.query('SELECT * FROM user_faculty ')
    res.render('list/students', {
        students,
        obj_faculty
    });
}
controller.view_teacher = async (req, res)=>{
    const teacher = await pool.query('SELECT * FROM user WHERE type_id = 1 ')
    const exam = await pool.query('SELECT * FROM exam')
    res.render('list/teacher', {
        teacher,
        exam
    });
}


module.exports = controller;