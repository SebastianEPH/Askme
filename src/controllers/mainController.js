const controller = {};

controller.main = (req, res)=>{
    /*req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM question', (err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            console.log(question)
            res.render('main', {    // ejs name
                data: question
            });
        });
    });*/

    res.render('main', {    // ejs name
        data: 0,
        nickname: ""
    });
};
controller.add = (req, res)=>{
    console.log("Add work")
    res.render('add');

};
controller.save = (req, res)=>{

        res.render('save');
        res.redirect("/");

}
controller.delete = (req, res)=>{
    //console.log(req.params.id)
    //res.send(req.params.id)
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('DELETE FROM question WHERE que_id = ?', [id], (err, rows)=>{
            res.redirect('/show');
        })


    });
}
controller.update = (req, res)=>{
    const { id } = req.params;

    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM question WHERE que_id = ?', [id],(err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            console.log(question)
            res.render('update', {    // ejs name
                data: question[0]
            });
        });
    })
}
controller.show = (req, res)=>{
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM question', (err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            console.log(question)
            res.render('show', {    // ejs name
                data: question
            });
        });
    })
}
controller.about = (req, res) =>{

}
controller.game = (req, res)=>{
    console.log(req.params.nickname)
    //console.log(req.params.cantidad)
    console.log(req.params.level)
    console.log(req.params)
    res.render('game',{
        data1: req.params
    })
}



controller.nickname = (req, res)=>{
    const { nick } = req.params;
    const nickname = req.body;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM user WHERE user_nick = ? ',nickname.user_nick ,(err, rows)=>{
            if (err){
                console.log("error en sentancia o no se puedo conetcar a la base de datos")
                console.log(err)
            } else{
                if (rows.length >= 1){
                    console.log("No puede usar el nickname, El nickname existe")
                    //console.log('<<<<<<<<<<<<<<<<<<<')
                    //console.log(rows)
                    //console.log(rows[0])
                    //console.log(rows.length)
                    //console.log(rows[0].user_nick)
                    //console.log('>>>>>>>>>>>>>>>>>>')
                    console.log(nickname)
                    //console.log(nickname.user_nick) // Correcot
                    // No hubo un error
                    res.render('main', {    // ejs name
                        data: 1,
                        nick: nickname
                    });
                }else{
                    console.log(nickname)
                    console.log("No existe el nickname, entonces hay que crear una")
                    res.redirect(`/game/${nickname.user_nick}/${nickname.can_id}/${nickname.lev_id}`);
                }

            }
        });
    });
}
module.exports = controller;