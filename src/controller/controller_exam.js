const pool = require('../database') // database import
const controller = {}
const util = require('../functions/util')

controller.get_delete= async (req, res)=>{
    const {id} = req.params;
    const get_exam = await pool.query('SELECT * FROM exam WHERE id = ?', [id] )//[req.user.user_id])
    console.log('exam user_id : '+ get_exam[0].user_id)
    console.log('user_id : '+ req.user.user_id)
    // Solo puede eliminar la pregunta si es el dueño
    if (get_exam[0].user_id === req.user.user_id ){
        console.log('Si tiene permiso para eliminar el examen')
        await pool.query('UPDATE exam SET is_show = 0 WHERE id = ?',[id])
        req.flash('success', 'Se eliminó la pregunta correctamente')

    }else{
        console.log('Usted no es el dueño del examen')
        req.flash('warning', 'Usted no tiene los permisos para realizar esta acción')
    }
    res.redirect('/exam')
}
controller.get_view_only_user= async (req, res)=>{

    const exam = await pool.query('SELECT * FROM exam WHERE user_id = ? AND is_show = 1', [req.user.user_id])
    const _user_ = await pool.query('SELECT user_id, user_nick , user_fullname FROM user  ')
    console.log('$$$$$$$$$$$$$$$$$$$$____')
    console.log(req.user.user_id);

    res.render('view_exam/view',{
        data: exam,
        _user_,
        current_user_id: req.user.user_id,
        all:false
    })
}
controller.get_view_all = async (req, res)=>{
    const exam = await pool.query('SELECT * FROM exam WHERE is_show = 1', )
    const _user_ = await pool.query('SELECT user_id, user_nick , user_fullname FROM user  ')
    console.log(_user_)
    res.render('view_exam/view',{
        data: exam,
        _user_,
        current_user_id: req.user.user_id ,
        all:true
    })



}
controller.get_create= async (req, res)=>{
    const data= await pool.query('SELECT * FROM question  WHERE is_show = 1', [req.user.user_id])
    data.nuevoitem = req.user.user_id
    res.render('view_exam/create', {
        data: data,
        all:true,
    });
    console.log(data)
}
controller.post_create= async (req, res)=>{

    if (req.body.chosen_questions){

        const exam = {
            title: req.body.title,
            commentary: req.body.commentary,
            date_init: req.body.in_time_init_1 + " "+ req.body.in_time_init_2 + ":00",
            date_finish: req.body.in_time_finish_1 + " "+ req.body.in_time_finish_2 + ":00",
            time_limit: req.body.in_time_limit_1 + ":"+req.body.in_time_limit_2,
            cat_id: req.body.category,
            date_create: util.get_current_date_db(),
            cant_ques : req.body.chosen_questions.length,
            ques_list : req.body.chosen_questions.toString(),
            lev_id: req.body.level,
            user_id : req.user.user_id
        }
        // Verifica si
        if (req.body.name_time_init === "0"){exam.date_init= null}
        if (req.body.name_time_finish === "0"){exam.date_finish = null}
        if (req.body.name_value_time_limit === "1"){exam.time_limit = null}

        console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRR')
        console.log(req.body)
        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOO')
        console.log(exam)
        console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYY')

        if(req.body.chosen_questions.length <1 ){
            req.flash('warning', 'Error, Debe escoger mínimamente 1 pregunta')
            res.redirect('/exam')
        }else{
            await pool.query('INSERT INTO exam SET ? ', [exam]);
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
        que_list_saved: "",
        note: 0,
        exam_id : id
    }

    if (util.compare_date_init(exam[0].date_init)){

        // Convierte String en Array
        let question_array = util.string_to_array(user_exam.que_list_temp, ',')
        console.log('Array de preguntas: '+question_array)
        // Selecciona del array un data aleatorio
        const chosen_question = util.random(question_array)
        console.log('Pregunta escogida al lazar: '+chosen_question)

        user_exam.que_list_saved = chosen_question;

        // Elimina la pregunta.

        user_exam.que_list_temp = util.removeItemFromArr(question_array, String(chosen_question))
        user_exam.que_list_temp = String(user_exam.que_list_temp)
        console.log('Preguntas temporales: '+user_exam.que_list_temp)
        await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam, id])


        // mostrar alternativas aletorias?
        const questions = await pool.query('SELECT * FROM question WHERE que_id = ?  AND is_show = 1',[chosen_question] )
        console.log(questions)


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
    }else{
        //const d = util.date_recent(exam[0].date_init)
        req.flash('warning', 'El examen se habilitará en ' + util.date_beautiful(exam[0].date_init))
        res.redirect('/exam')
    }

}
controller.post_start =async (req, res)=>{
    let user_reply__ = false
    let {user_reply} = req.body
    const {que_true, exam_id, exam_user_id} = req.params

    const get_exam_user = await pool.query('SELECT * FROM exam_user WHERE id = ? ', [exam_user_id])
    const exam = await pool.query('SELECT * FROM exam WHERE id = ? ', [exam_id])

    req.params.que_current = parseInt(req.params.que_current) + 1
    const user_exam = {
        que_list_reply:get_exam_user[0].que_list_reply,  // llega por el req.body
        que_true_reply: get_exam_user[0].que_true_reply,
        que_false_reply:get_exam_user[0].que_false_reply,
        que_list_saved: get_exam_user[0].que_list_saved,
        note: get_exam_user[0].note,
        date_finish:get_exam_user[0].date_finish,
        que_nothing_reply:get_exam_user[0].que_nothing_reply
    }
    console.log(user_exam )
    console.log(exam )

    // Si el usuario no respondió, la respuesta es igual a 0
    if (user_reply){
    }else{
        user_reply = 0;
        user_reply__ = true
    }

    // Evita que al actualizar la pagina, se vuelva a enviar la respuesta
    if(util.string_to_array(exam[0].ques_list, ',').length  > util.string_to_array(user_exam.que_list_reply, ',').length ){ //
            console.log(get_exam_user)
            // Verifica si es la primer pregunta
            if (get_exam_user[0].que_list_reply === "" ){
                user_exam.que_list_reply =  user_reply
                console.log('primera. '+ user_reply)
            }else{
                console.log('ya pasó'+ user_exam.que_list_reply + ","+ user_reply)
                user_exam.que_list_reply = user_exam.que_list_reply + ","+ user_reply
            }

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
            // Coloca nota Temporal o final
            //let note_temp = util.string_to_array(user_exam.que_list_reply, ',')
            console.log('NOTA cantidad '+exam[0].cant_ques)
            console.log('NOTA que true reply '+user_exam.que_true_reply)
            user_exam.note = util.calcule_note(user_exam.que_true_reply, exam[0].cant_ques)
            console.log('NOTA: '+ user_exam)
            user_exam.date_finish = new Date()
    }

    await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam, exam_user_id])

    // Verifica si ya se supero al fecha actual
    if (req.params.que_current > exam[0].cant_ques || util.compare_date_finish(exam[0].date_init)){
        // SELECT * FROM `question` WHERE que_id IN ( 5, 10 , 1 , 50) ORDER BY FIELD( que_id, 5, 10 , 1 , 50 )
        const questions_= await pool.query('SELECT * FROM question WHERE que_id IN ( '+ String(get_exam_user[0].que_list_saved) +' ) ORDER BY FIELD (  que_id ,'+ String(get_exam_user[0].que_list_saved) +' )')

        console.log(questions_)

        // guarda métadatos a `exam_user`
        const _exam_user_ = {
            que_true_reply: user_exam.que_true_reply,
            que_false_reply: user_exam.que_false_reply,
            que_nothing_reply: user_exam.que_nothing_reply,
        }
        // coloca la fecha de entrega
        /*if (user_exam.date_finish === null){
            _exam_user_.date_finish = new Date()
        }*/
        console.log(_exam_user_)
        await pool.query('UPDATE exam_user set ? WHERE id = ?', [_exam_user_, exam_user_id])
        const teacher = await pool.query('SELECT user_id, user_fullname FROM user WHERE type_id = 1 ')
        res.render('view_exam/finish_exam',{
            questions: questions_,
            exam: exam[0],
            teacher,
            exam_user_: get_exam_user[0],
            que_list_reply: user_exam.que_list_reply,
            que_current: req.params.que_current,
            que_total:exam[0].cant_ques,
            que_true_reply: user_exam.que_true_reply,
            que_false_reply:user_exam.que_false_reply,
            que_nothing_reply:user_exam.que_nothing_reply,
            exam_user_id,
        })

    }else{

        // se muestra una pregunta nueva
        console.log('Pregunta actual: '+req.params.que_current )
        console.log('Total de preguntas: '+exam[0].cant_ques)


        const user_exam__= {
            que_list_temp: get_exam_user[0].que_list_temp,
            que_list_saved: get_exam_user[0].que_list_saved
        }
        console.log(user_exam__)

        // Convierte String en Array
        let question_array = util.string_to_array(user_exam__.que_list_temp, ',')

        // Selecciona del array un data aleatorio
        const chosen_question = util.random(question_array)
        console.log('Pregunta escogida: '+ chosen_question)

        user_exam__.que_list_saved = String( user_exam__.que_list_saved + ","+ chosen_question);
        console.log(user_exam__.que_list_saved +'<= pregunta en lists saved ')


        // Elimina la pregunta.
        user_exam__.que_list_temp = util.removeItemFromArr(question_array, String(chosen_question))
        console.log(user_exam__.que_list_temp)
        user_exam__.que_list_temp = String(user_exam__.que_list_temp)

        await pool.query('UPDATE exam_user set ? WHERE id = ?', [user_exam__, exam_user_id])
        console.log('Lo que se guardó ')
        // mostrar alternativas aletorias?
        const questions = await pool.query('SELECT * FROM question WHERE que_id = ?',[chosen_question] )
        console.log( questions[0])
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
controller.get_view_my = async (req, res)=> {
    const user_exam = await pool.query('SELECT * FROM exam_user WHERE user_id = ?', [req.user.user_id])
    const exam = await pool.query('SELECT * FROM exam ' )
    const _user_ = await pool.query('SELECT user_id, user_nick , user_fullname FROM user', )
    res.render('view_exam/view_note_my',{
        all: false,
        exam,
        _user_,
        __user: req.user.user_id,
        user_exam,
    })
}
controller.get_view_students= async (req, res)=>{
    const exam = await pool.query('SELECT * FROM exam  WHERE user_id = ? ',[req.user.user_id])
    if (exam){
        let new_exam_id = ""
        for (let i = 0; i < exam.length; i++) {
            if(new_exam_id === ""){
                new_exam_id  = exam[i].id
            }else{
                new_exam_id  = new_exam_id + ","+exam[i].id
            }
        }
        console.log(new_exam_id)
        const user_exam = await pool.query('SELECT * FROM exam_user WHERE exam_id IN ('+new_exam_id+')'  )
        const _user_ = await pool.query('SELECT * FROM user' )
        res.render('view_exam/view_note_all',{
            all: true,
            exam,
            _user_,
            __user: req.user.user_id,
            user_exam,
        })

    }else{

        res.send('nadie tomo tus examenes')
    }

}
controller.post_view_exam = async (req, res)=>{

    const exam_user_id = req.params.id
    const exam_id = req.params.exam
    const get_exam_user = await pool.query('SELECT * FROM exam_user WHERE id = ? ', [exam_user_id])
    const exam = await pool.query('SELECT * FROM exam WHERE id = ? ', [exam_id])
    const questions_= await pool.query('SELECT * FROM question WHERE que_id IN ( '+ String(get_exam_user[0].que_list_saved) +' ) ORDER BY FIELD (  que_id ,'+ String(get_exam_user[0].que_list_saved) +' )')
    const teacher = await pool.query('SELECT user_id, user_fullname FROM user WHERE type_id = 1 ')
    const user_exam = {
        que_list_reply:get_exam_user[0].que_list_reply,  // llega por el req.body
        que_true_reply: get_exam_user[0].que_true_reply,
        que_false_reply:get_exam_user[0].que_false_reply,
        que_list_saved: get_exam_user[0].que_list_saved,
        note: get_exam_user[0].note,
        date_finish:get_exam_user[0].date_finish,
        que_nothing_reply:get_exam_user[0].que_nothing_reply
    }
    // guarda métadatos a `exam_user`
    const _exam_user_ = {
        que_true_reply: user_exam.que_true_reply,
        que_false_reply: user_exam.que_false_reply,
        que_nothing_reply: user_exam.que_nothing_reply,
    }

    console.log(_exam_user_)
    await pool.query('UPDATE exam_user set ? WHERE id = ?', [_exam_user_, exam_user_id])

    res.render('view_exam/finish_exam',{
        questions: questions_,
        exam: exam[0],
        teacher,
        exam_user_: get_exam_user[0],
        que_list_reply: user_exam.que_list_reply,
        que_current: req.params.que_current,
        que_total:exam[0].cant_ques,
        que_true_reply: user_exam.que_true_reply,
        que_false_reply:user_exam.que_false_reply,
        que_nothing_reply:user_exam.que_nothing_reply,
        exam_user_id,
    })
}

module.exports = controller;