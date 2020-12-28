const pool = require('../database') // database import
const controller = {}


controller.get_delete= (req, res)=>{

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
    console.log(question[45].que_id)
    res.render('view_exam/start',{
        question: question[52],
        exam: exam[0],
        que_num:1,
        attempts: 1,
        _error: 21,
        _success:50
    })
    //res.send('finalizó')
}
controller.post_start =async (req, res)=>{
    /*
    # información
    exam_id:    Id del examen actual
    que_id:     Pregunta actual
    que_true:   Respuesta correcta de la pregunta
    que_reply:  Respuesta del usuario

    # Metadata
    que_n:      de N preguntas , en cual estamos
    que_total:  Maximo de preguntas
    attempts:   Intentos

 */
   // const exam_user = await pool.query('SELECT * FROM exam_user WHERE id = ? ', [id])

    const {user_reply} = req.body; // User Reply
    const exam_user = {
        exam_id : req.params.exam_id,
        user_id : req.user.user_id,
        que_id: req.params.que_id,
        que_istrue: 2,
        //que_true: req.params.que_true,
        que_n : req.params.que_n,
        que_total: req.params.que_total,
        attempts: req.params.attempts
    }
    console.log(exam_user)
    if(req.params.que_true === user_reply){
        success = "Respuesta correcta + feedback"
        exam_user.que_istrue  = 1 ;
    }else{
        warning = "la respues es incorrecta + su feedback"
        exam_user.que_istrue  = 0 ;
    }

    await pool.query('INSERT INTO exam_user SET ? ', [exam_user])
    //console.log(exam_insert)



    //res.send('post pex lleg+o normal')
    res.redirect('/exam/start/4')


}











module.exports = controller;