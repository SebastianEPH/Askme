const controller = {}

controller.get_view_main = (req,res)=>{
    res.render('others/main')
}
controller.get_about = (req, res)=>{
    res.render('others/about')
}


module.exports = controller;