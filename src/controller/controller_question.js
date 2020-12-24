const pool = require('../database') // database import
const controller = {};

controller.get_add = (req, res)=>{
        res.render('data_question/add')
}
controller.post_add = async (req,res)=>{
    const {cat_id, lev_id, ty_id, que_que, que_1, que_2, que_3, que_4, que_true} = req.body;
    const newQuestion= {
        cat_id,
        lev_id,
        ty_id,
        que_que,
        que_1,
        que_2,
        que_3,
        que_4,
        que_true,
        user_id : req.user.user_id
    }
    await pool.query('INSERT INTO question SET ? ', [newQuestion]);
    req.flash('success', 'Se guardó la pregunta correctamente')
    res.redirect('/question')
}
controller.get_delete = async (req, res)=>{
    const {id} = req.params;
    console.log(req.params)
    await pool.query('DELETE FROM question WHERE que_id = ? ',[id])
    req.flash('success', 'Se eliminó la pregunta correctamente')
    res.redirect('/question')

}
controller.get_edit = async (req, res)=>{
    const {id} = req.params
    console.log(req.params)
    console.log([id])
    const question = await pool.query('SELECT * FROM question WHERE que_id = ?',[id]);
    console.log(question)
    res.render('data_question/edit',{
        question : question[0] //  question[0]
    })
}
controller.view = async (req, res)=>{
    const {id} = req.params
    console.log(req.params)
    console.log([id])
    const question = await pool.query('SELECT * FROM question WHERE que_id = ?',[id]);
    console.log(question)
    res.render('data_question/view',{
        question : question[0] //  question[0]
    })
}
controller.post_update = async(req, res)=>{
    const {id} = req.params
    const data = req.body
    await pool.query('UPDATE question set ? WHERE que_id = ?', [data, id])
    req.flash('success', "Se editó la pregunta correctamente")
    res.redirect ('/question')
}
controller.get_show_onlyUser = async (req,res)=>{
    const question = await pool.query('SELECT * FROM question WHERE user_id = ?', [req.user.user_id])
    res.render('data_question/show',{
        question: question,
        all: false
    })
}
controller.get_show_all = async (req,res)=>{
    const question = await pool.query('SELECT * FROM question', [req.user.user_id])
    res.render('data_question/show',{
        question: question,
        all:true
    })
}







module.exports = controller;
