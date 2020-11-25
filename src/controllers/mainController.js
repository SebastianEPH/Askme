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
        nick: ""
    });
};
controller.checkNickname = (req, res)=>{
    const nick = req.body;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM user WHERE user_nick = ? ',nick.user_nick ,(err, rows)=>{
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
                    console.log(nick)
                    //console.log(nickname.user_nick) // Correcot
                    // No hubo un error
                    res.render('main', {    // ejs name
                        data: 1,
                        nick: nick.user_nick
                    });
                }else{
                    console.log(nick)
                    console.log("No existe el nickname, entonces hay que crear una")
                    //conn.query('SELE')

                    res.redirect('/start');
                }

            }
        });
    });
}


module.exports = controller;