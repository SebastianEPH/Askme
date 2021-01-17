const pool = require('../database') // database import
const controller = {}
const util = require('../functions/util')

controller.get_all = async (req, res)=>{




}
controller.get_my = async (req, res)=>{
    // ver todos mis examens
    const user_exam = await pool.query('SELECT * FROM exam_user WHERE user_id = ?', [req.user.user_id])
    const exam = await pool.query('SELECT * FROM exam ' )
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
        name_graphics: "Respondió",
        labels: "Verdaderas,Equivocadas,En blanco",
        data: String(my_Data.questions_true+','+my_Data.questions_false+','+my_Data.questions_nothing),
        exist: exist
    })



}
controller.get_questions = async (req, res)=>{




}
controller.get_exam = async (req, res)=>{





}

module.exports  = controller;


