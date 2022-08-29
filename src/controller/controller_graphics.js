const pool = require('../database') // database import
const controller = {}
const util = require('../helpers/util')

controller.get_all = async (req, res)=>{
    const user_exam = await pool.query('SELECT * FROM exam_user', )
    console.log(user_exam)
    const my_Data = {
        questions_true: 0,
        questions_false: 0,
        questions_nothing: 0,
        average_note: 0,
    }
    for (let i = 0; i < user_exam.length; i++){
        //for (let j = 0; j < user_exam[i].length; j++){
            my_Data.questions_true = my_Data.questions_true + user_exam[i].que_true_reply
            my_Data.questions_false = my_Data.questions_false+ user_exam[i].que_false_reply
            my_Data.questions_nothing= my_Data.questions_nothing+ user_exam[i].que_nothing_reply
        //}
    }

    console.log(my_Data)
    let exist = true
    if(my_Data.questions_true === 0 && my_Data.questions_false === 0 && my_Data.questions_true === 0){
        exist = false  // No mostrar el gráfico
        req.flash('warning', 'Usted no tiene notas registradas')
    }

    res.render('graphics/graphics',{
        name: my_Data.name,
        name_graphics: "Respuestas",
        labels: "Verdaderas,Equivocadas,En blanco",
        data: String(my_Data.questions_true+','+my_Data.questions_false+','+my_Data.questions_nothing),
        exist: exist
    })

}
controller.get_my = async (req, res)=>{
    // ver todos mis examens
    const user_exam = await pool.query('SELECT * FROM exam_user WHERE user_id = ?', [req.user.user_id])
    const _user_ = await pool.query('SELECT user_id, user_nick , user_fullname FROM user', )


    const my_Data = {
        name: _user_[0].user_fullname,
        questions_true: 0,
        questions_false: 0,
        questions_nothing: 0,
        average_note: 0,
    }
    for (let i = 0; i < user_exam.length; i++){
        my_Data.questions_true = my_Data.questions_true + user_exam[i].que_true_reply
        my_Data.questions_false = my_Data.questions_false+ user_exam[i].que_false_reply
        my_Data.questions_nothing= my_Data.questions_nothing+ user_exam[i].que_nothing_reply
    }

    console.log(my_Data)
    let exist = true
    if(my_Data.questions_true === 0 && my_Data.questions_false === 0 && my_Data.questions_true === 0){
        exist = false  // No mostrar el gráfico
        req.flash('warning', 'Usted no tiene notas registradas')
    }

    res.render('graphics/graphics',{
        name: my_Data.name,
        name_graphics: "Respuestas",
        labels: "Verdaderas,Equivocadas,En blanco",
        data: String(my_Data.questions_true+','+my_Data.questions_false+','+my_Data.questions_nothing),
        exist: exist
    })

}
controller.get_questions = async (req, res)=>{
    const user_exam = await pool.query('SELECT * FROM exam_user', )
    console.log(user_exam)
    const questions_and_true = {
        questions: "",
        reply_true: "",
    }

    for (let i = 0; i < user_exam.length; i++){
        questions_and_true.questions = questions_and_true.questions +","+ user_exam[i].que_list_saved
        questions_and_true.reply_true = questions_and_true.reply_true +","+ user_exam[i].que_list_reply
    }

    console.log(questions_and_true)







    res.send('llegó ')
    /*
    const my_Data = {
        questions_true: 0,
        questions_false: 0,
        questions_nothing: 0,
        average_note: 0,
    }
    for (let i = 0; i < user_exam.length; i++){
        for (let j = 0; j < user_exam.length; j++){
            my_Data.questions_true = my_Data.questions_true + user_exam[i].que_true_reply
            my_Data.questions_false = my_Data.questions_false+ user_exam[i].que_false_reply
            my_Data.questions_nothing= my_Data.questions_nothing+ user_exam[i].que_nothing_reply
        }
    }

    console.log(my_Data)
    let exist = true
    if(my_Data.questions_true === 0 && my_Data.questions_false === 0 && my_Data.questions_true === 0){
        exist = false  // No mostrar el gráfico
        req.flash('warning', 'Usted no tiene notas registradas')
    }

    res.render('graphics/graphics',{
        name: my_Data.name,
        name_graphics: "Respuestas",
        labels: "Verdaderas,Equivocadas,En blanco",
        data: String(my_Data.questions_true+','+my_Data.questions_false+','+my_Data.questions_nothing),
        exist: exist
    }) */

}
controller.get_exam = async (req, res)=>{
    // estudiante con mas nota
    //pregunta mas respondida
    //pregunta


}

module.exports  = controller;


