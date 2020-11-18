const controller = {};

controller.main = (req, res)=>{
    req.getConnection((err, conn)=>{
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

module.exports = controller;