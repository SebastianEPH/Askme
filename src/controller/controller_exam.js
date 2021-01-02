const pool = require('../database') // database import
const controller = {}
const util = require('../functions/util')


controller.get_delete= (req, res)=>{

}
controller.get_view_only_user= async (req, res)=>{
    const exam = await pool.query('SELECT * FROM exam WHERE user_id = ?', [req.user.user_id])
    console.log('$$$$$$$$$$$$$$$$$$$$____')
    console.log(req.user.user_id);

    res.render('view_exam/view',{
        data: exam,
        all:false
    })
}
controller.get_view_all = async (req, res)=>{
    const exam = await pool.query('SELECT * FROM exam', )
    console.log('$$$$$$$$$$$$$$$$$$$$')
    res.render('view_exam/view',{
        data: exam,
        all:true
    })
}
controller.get_create= async (req, res)=>{
    const data= await pool.query('SELECT * FROM question', [req.user.user_id])
    data.nuevoitem = req.user.user_id
    res.render('view_exam/create', {
        data: data,
        all:true,
    });
    console.log(data)
}
controller.post_create= async (req, res)=>{
    const {title, commentary, time, category, level, chosen_questions } = req.body;
    if (chosen_questions){
        const newExam= {
            title,
            commentary,
            //time,
            cat_id:category,
            lev_id: level,
            cant_ques : chosen_questions.length,   // Cantidad de preguntas
            ques_list : chosen_questions.toString(),    // ID separado por arrays
            user_id : req.user.user_id
        }
        console.log(newExam)
        if(chosen_questions.length <=3 ){
            req.flash('warning', 'Error, Debe escoger mínimamente 3 preguntas')
            res.redirect('/exam')
        }else{
            await pool.query('INSERT INTO exam SET ? ', [newExam]);
            req.flash('success', 'Se creó el examen correctamente')
            res.redirect('/exam')
        }

    }else{
        req.flash('warning', 'Error, usted no escogio ninguna pregunta')
        res.redirect('/exam')
    }
}
controller.get_start = async (req, res)=>{

    const {id} = req.params ;
    // get exam
    const exam = await pool.query('SELECT * FROM exam WHERE id = ? ', [id])

    const get_exam= {
        title: exam[0].title,
        commentary: exam[0].commentary,
        //time,
        cat_id:exam[0].cat_id,
        lev_id: exam[0].lev_id,
        cant_ques : exam[0].cant_ques,   // Cantidad de preguntas
        ques_list : exam[0].ques_list,    // ID separado por arrays
        user_id : req.user.user_id
    }

    const user_exam = {
        que_current: 0,
        user_id: req.user.user_id,
        que_list_reply: "",
        que_true_reply: 0,
        que_false_reply: 0,
        exam_id : id
    }
    var cadena = exam[0].ques_list,
        separador = ",",
        questions_list = cadena.split(separador);
    console.log(questions_list)
    // mostrar preguntas aleatorios

    const chosen_question = Math.floor(Math.random()*questions_list.length)
    console.log(chosen_question)
    console.log(Math.floor(Math.random()*questions_list.length))
    
    
    
    // mostrar alternativas aletorias?
    const questions = await pool.query('SELECT * FROM question WHERE que_id = ?',[questions_list[chosen_question]] )



    const insert_exam_user = await pool.query('INSERT INTO exam_user SET ? ', [user_exam]);
    console.log('examen es igual al')
    console.log(insert_exam_user)
    res.render('view_exam/start',{
        question: questions[0],
        exam: exam[0],
        que_current: user_exam.que_current +1,
        que_total:exam[0].cant_ques,
        que_true_reply: 0,
        que_false_reply:0,
        exam_user_id:insert_exam_user.insertId,
        _error: 0,
        _success:0
    })
    //res.send('finalizó')
}
controller.post_start =async (req, res)=>{

    const {user_reply} = req.body
    const {que_true, que_true_reply, que_false_reply, exam_id, exam_user_id} = req.params

    const get_exam_user = await pool.query('SELECT * FROM exam_user WHERE id = ? ', [exam_user_id])
    const exam = await pool.query('SELECT * FROM exam WHERE id = ? ', [exam_id])



    // Verifica si es la primer pregunta
    if (get_exam_user[0].que_list_reply.length <=1){get_exam_user[0].que_list_reply = user_reply
    }else{get_exam_user[0].que_list_reply =","+ user_reply}

    const user_exam = {
        que_current: get_exam_user[0].que_current+1,
        que_list_reply:get_exam_user[0].que_list_reply,  // llega por el req.body
        que_true_reply: get_exam_user[0].que_true_reply,
        que_false_reply:get_exam_user[0].que_false_reply
    }
    console.log(user_exam )
    // Verifica si la respuesta es correcta
    if(que_true === user_reply){
        //success = "Respuesta correcta + feedback"
        user_exam.que_true_reply = user_exam.que_true_reply + 1 ;
    }else{
        //warning = "la respues es incorrecta + su feedback"
        user_exam.que_false_reply = user_exam.que_false_reply +1;
    }

    await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam, exam_user_id])

    // se muestra una pregunta nueva

    //if(get_exam_user[0].que_current >=  get_exam_user[0].cant_ques)

    // si exam.cant_ques se supero entonces pasar a la fista final


    var cadena = exam[0].ques_list,
        separador = ",",
        arregloDeSubCadenas = cadena.split(separador);
    console.log(arregloDeSubCadenas)
    // mostrar preguntas aleatorios
    // mostrar alternativas aletorias?
    const questions = await pool.query('SELECT * FROM question WHERE que_id = ?',[arregloDeSubCadenas[1]] )
    res.render('view_exam/start',{
        question: questions[0],
        exam: exam[0],
        que_current: user_exam.que_current,
        que_total:exam[0].cant_ques,
        que_true_reply: 0,
        que_false_reply:0,
        exam_user_id,
        _error: 0,
        _success:0
    })









    /*

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


    await pool.query('INSERT INTO exam_user SET ? ', [exam_user])
    //console.log(exam_insert)
    /*
    //res.send('post pex lleg+o normal')
    res.redirect('/exam/start/4')
    */

}



module.exports = controller;