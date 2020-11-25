const controller = {};




controller.getStartListQuestion = (req, res)=>{
    const {user_nick, cant_id, lev_id} = req.body
    const ID_question = []
    console.log(">>>>>>>>>>>><<<<<<<<<<<>><")
    console.log(req.body)
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM question', (err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            //console.log(question)
            console.log('**********************************')
            for (i = 1; i < question.length ; i++){
                console.log(question[i].que_id)
                ID_question.push(question[i].que_id)
            }
            console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
            console.log(ID_question)

            res.render('get_question',{
                check : false,
                reply : false,
                questions: ID_question,
                question: question[0]
            })
        });
    });

    // Obtiene pregunta de la db
    // Obtiene la respuesta
    // aleatorio prespuesta
    // responde con radio buton
    // boton verificar pregunta
    // boton post '/game/check' // Recibir el numero de pregunta
    // recibe el dato y lo muestra en pantalla
    // Boton => sigieuiente pregunta /game
}
controller.postStartListQuestion = (req, res)=>{
    const {user_nick, cant_id, lev_id} = req.body
    const ID_question = []
    console.log(">>>>>>>>>>>><<<<<<<<<<<>><")
    console.log(req.body)
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM question', (err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            //console.log(question)
            console.log('**********************************')
            for (i = 1; i < question.length ; i++){
                console.log(question[i].que_id)
                ID_question.push(question[i].que_id)
            }
            console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
            console.log(ID_question)

            res.render('post_question',{
                check : false,
                reply : false,
                questions: ID_question,
                question: question[0]
            })
        });
    });

    // Obtiene pregunta de la db
    // Obtiene la respuesta
    // aleatorio prespuesta
    // responde con radio buton
    // boton verificar pregunta
    // boton post '/game/check' // Recibir el numero de pregunta
    // recibe el dato y lo muestra en pantalla
    // Boton => sigieuiente pregunta /game
}
controller.checkQuestion = (req, res)=>{
    const {id} = req.params
    const {reply} = req.body
    console.log(` El id es: ${id}` );
    console.log(req.body)
    //res.send("finish")
    if (id === reply){
        res.send("respuesta correcta ")
    }else{
        res.send("respuesta incorrecta ")
    }
    // pregunta correcta guardarlo
}







module.exports = controller
