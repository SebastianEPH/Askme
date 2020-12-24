const pool = require('../database') // database import
const controller = {}


controller.get_new= (req, res)=>{

}
controller.get_view_only_user= async (req, res)=>{
    const exam = await pool.query('SELECT * FROM exam WHERE user_id = ?', [req.user.user_id])
    console.log('$$$$$$$$$$$$$$$$$$$$____')
    console.log(req.user.user_id);
    console.log(exam)
    res.render('view_exam/view',{
        data: exam,
        all:false
    })

}
controller.get_view_all = async (req, res)=>{
    const exam = await pool.query('SELECT * FROM exam', [req.user.user_id])
    console.log('$$$$$$$$$$$$$$$$$$$$')
    console.log(exam)
    res.render('view_exam/view',{
        data: exam,
        all:true
    })
}
controller.get_create= (req, res)=>{
    res.render('view_exam/create')
}
controller.post_create= async (req, res)=>{
    console.log('#########################')
    console.log(req.body)
    const {title, commentary, category, level, random, time, question, } = req.body;
    const newExam= {
        title,
        commentary,
        cat_id: category,
        lev_id: level,
        reply_ran: random,
        limit_time: time,
        cant_ques: question,
        user_id : req.user.user_id
    }
    console.log(newExam)
    await pool.query('INSERT INTO exam SET ? ', [newExam]);
    req.flash('success', 'Se creó el examen correctamente')
    res.redirect('/exam')

}
controller.get_start = (req, res)=>{

}











module.exports = controller;