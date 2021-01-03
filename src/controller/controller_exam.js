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
        if(chosen_questions.length <=2 ){
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

    const user_exam = {
        //que_current: 0,
        user_id: req.user.user_id,
        que_list_reply: "",
        que_true_reply: 0,
        que_false_reply: 0,
        que_nothing_reply: 0,
        que_list_temp: exam[0].ques_list,
        exam_id : id
    }

    // Convierte String en Array
    let question_array = util.string_to_array(user_exam.que_list_temp, ',')
    console.log(question_array)
    // Selecciona del array un data aleatorio
    const chosen_question = util.random(question_array.length)
    console.log('Pregunta escogida'+chosen_question)
    // Elimina la pregunta.

    user_exam.que_list_temp = util.removeItemFromArr(question_array, String(chosen_question))
    //console.log(util.removeItemFromArr(question_array, String(chosen_question)))
    user_exam.que_list_temp = String(user_exam.que_list_temp)
    console.log(user_exam.que_list_temp)
    await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam, id])


    // mostrar alternativas aletorias?
    const questions = await pool.query('SELECT * FROM question WHERE que_id = ?',[question_array[chosen_question]] )



    const insert_exam_user = await pool.query('INSERT INTO exam_user SET ? ', [user_exam]);
    res.render('view_exam/start',{
        question: questions[0],
        exam: exam[0],
        que_current: 1,
        que_total:exam[0].cant_ques,
        que_true_reply: 0,
        que_false_reply:0,
        que_nothing_reply: 0,
        exam_user_id:insert_exam_user.insertId,
        _error: 0,
        _success:0
    })
    //res.send('finalizó')
}
controller.post_start =async (req, res)=>{
    let user_reply__ = false
    let {user_reply} = req.body
    const {que_true, exam_id, exam_user_id} = req.params

    const get_exam_user = await pool.query('SELECT * FROM exam_user WHERE id = ? ', [exam_user_id])
    const exam = await pool.query('SELECT * FROM exam WHERE id = ? ', [exam_id])

    req.params.que_current = parseInt(req.params.que_current) + 1

    // Si el usuario no respondió, la respuesta es igual a 0
    if (!user_reply){
        user_reply = 0;
        user_reply__ = true
    }

    console.log(get_exam_user)
    // Verifica si es la primer pregunta
    if (get_exam_user[0].que_list_reply === "" ){
        get_exam_user[0].que_list_reply =  user_reply
    }else{
        get_exam_user[0].que_list_reply = get_exam_user[0].que_list_reply + ","+ user_reply
    }

    const user_exam = {
        que_list_reply:get_exam_user[0].que_list_reply,  // llega por el req.body
        que_true_reply: get_exam_user[0].que_true_reply,
        que_false_reply:get_exam_user[0].que_false_reply,
        que_nothing_reply:get_exam_user[0].que_nothing_reply
    }
    console.log(user_exam )
    // Verifica si la respuesta es correcta
    if(user_reply__){
        //success = "Respuesta correcta + feedback"
        user_exam.que_nothing_reply = user_exam.que_nothing_reply + 1 ;
    }else{
        if(que_true === user_reply){
            //success = "Respuesta correcta + feedback"
            user_exam.que_true_reply = user_exam.que_true_reply + 1 ;
        }else{
            //warning = "la respues es incorrecta + su feedback"
            user_exam.que_false_reply = user_exam.que_false_reply + 1;
        }
    }


    await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam, exam_user_id])

    // se muestra una pregunta nueva
    //  Verifica si es la pregunta final
    console.log('Pregunta actual: '+req.params.que_current )
    console.log('Total de preguntas: '+exam[0].cant_ques)

    if (  req.params.que_current > exam[0].cant_ques ){
        res.send('El examen terminó')
    }else{
        const user_exam__= {
            que_list_temp: get_exam_user[0].que_list_temp
        }
        console.log(user_exam__)

        // Convierte String en Array
        let question_array = util.string_to_array(user_exam__.que_list_temp, ',')

        // Selecciona del array un data aleatorio
        const chosen_question = util.random(question_array.length)
        console.log('Pregunta escogida'+chosen_question)

        // Elimina la pregunta.
        user_exam__.que_list_temp = util.removeItemFromArr(question_array, String(chosen_question))
        user_exam__.que_list_temp = String(user_exam__.que_list_temp)
        console.log(user_exam.que_list_temp)
        await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam__, exam_user_id])

        // mostrar alternativas aletorias?
        const questions = await pool.query('SELECT * FROM question WHERE que_id = ?',[question_array[chosen_question]] )
        res.render('view_exam/start',{
            question: questions[0],
            exam: exam[0],
            que_current: req.params.que_current,
            que_total:exam[0].cant_ques,
            que_true_reply: user_exam.que_true_reply,
            que_false_reply:user_exam.que_false_reply,
            que_nothing_reply:user_exam.que_nothing_reply,
            exam_user_id,
        })
    }
}



module.exports = controller;