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
    req.getConnection((err, conn)=>{
        const _data = req.body;
        if(err){
            console.log(err)
        }
        conn.query("INSERT INTO question set ?", [_data], (err, rows)=>{
            console.log([_data])
            //console.log(req.body[1])
            console.log(rows)   // Todos los datos  que se encuentran en al tabla
        });
        res.render('save', {    // ejs name
            data: question
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
controller.about = (req, res) =>{

}

module.exports = controller;