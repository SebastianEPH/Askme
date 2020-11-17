const controller = {};

controller.list = (req, res)=>{
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

    res.render('add', {    // ejs name

    });
};


controller.save = (req, res)=>{
    req.getConnection((err, conn)=>{
        const data = req.body;
        conn.query("INSERT INTO question set ?", [data], (err, rows)=>{
            if(err){
                console.log(err)
            }
            res.render('save');
            console.log([data])
            //console.log(req.body[1])
            console.log(rows)   // Todos los datos  que se encuentran en al tabla
        });
    });
}


module.exports = controller;