const controller = {};

controller.add = (req, res)=>{
    console.log("Add work")
    res.render('add');

};
controller.save = (req, res)=>{
    const data = req.body
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO question SET ? ', [data], (err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            console.log(question)
            res.redirect("/show")
        });
    });

}
controller.del = (req, res)=>{
    //console.log(req.params.id)
    //res.send(req.params.id)
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('DELETE FROM question WHERE que_id = ?', [id], (err, rows)=>{
            res.redirect('/show');
        })


    });
}
controller.edit = (req, res)=>{
    const { id } = req.params;

    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM question WHERE que_id = ?', [id],(err, question)=>{
            if (err){
                //next(err)
                res.json(err)
            }
            console.log(question)
            res.render('edit', {    // ejs name
                data: question[0]
            });
        });
    })
}
controller.update = (req, res)=>{
    const {id}= req.params;
    const data =  req.body;
    req.getConnection((err, conn)=>{
        conn.query('UPDATE  question set ? WHERE  que_id = ?',[data, id], (err, rows)=>{
            console.log(id)
            console.log(data)
            console.log('********************************')
            res.redirect("/show")
        });
    });



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
module.exports = controller;