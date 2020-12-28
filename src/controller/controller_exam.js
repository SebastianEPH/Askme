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
    const exam = await pool.query('SELECT * FROM exam', )
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
        is_random: random,
        limit_time: time,
        cant_ques: question,
        user_id : req.user.user_id
    }
    console.log(newExam)
    await pool.query('INSERT INTO exam SET ? ', [newExam]);
    req.flash('success', 'Se creó el examen correctamente')
    res.redirect('/exam')
}
controller.get_start = async (req, res)=>{
    const {id} = req.params ;
    console.log(id)
    // get exam
    const exam = await pool.query('SELECT * FROM exam WHERE id = ? ', [id])
    console.log(exam[0])
    const question = await pool.query('SELECT * FROM question ' )
    //console.log(question)
    console.log(question[3].que_id)
    res.render('view_exam/start',{
        question: question[5],
        exam: exam[0],
        _error: 21,
        _success:50
    })
    //res.send('finalizó')
}
controller.post_start =async (req, res)=>{
    const {exam_id, que_reply} = req.params ;   // Correct
    const {user_reply} = req.body; // User Reply
    const exam_user = {
        exam_id : exam_id,
        user_id : req.user.user_id,
        que_id: 93,
        que_istrue: 1,
        que_n : 3,
        que_total: 23,
        attempts: 2
    }

    if(user_reply === que_reply){
        success = "Respuesta correcta + feedback"
        exam_user.que_istrue  = 1 ;
    }else{
        warning = "la respues es incorrecta + su feedback"
        exam_user.que_istrue  = 0 ;
    }

    //await pool.query('INSERT INTO exam_user SET ? ', [exam_user])
    //console.log(exam_insert)



    //res.send('post pex lleg+o normal')
    res.redirect('/exam/start/4')


}











module.exports = controller;