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
    res.render('list/students', {
        students
    });
}
controller.view_teacher = async (req, res)=>{
    const teacher = await pool.query('SELECT * FROM user WHERE type_id = 1 ')
    res.render('list/teacher', {
        teacher
    });
}


module.exports = controller;