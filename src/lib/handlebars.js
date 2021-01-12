const {format} = require('timeago.js')
const pool = require('../database') // async


const helpers = {}
// Convierte fecha a tiempo transcurrido
helpers.timeago = (timestamp)=>{
    const g = "0000-00-04T04:00:00.000Z"
    return format(timestamp-g);
}
helpers.category = (num)=>{
    switch (num){
        case 1 : return "Hardware";
        case 2 : return "Programación";
        case 3 : return "Redes";
        case 4 : return "Diseño gráfico";
        case 5 : return "Cultura general";
        case 6 : return "Office";
        default: return "Todas"
    }
}
helpers.level = (level)=>{
    switch (level){
        case 1 : return "Facil";
        case 2 : return "Intermedio";
        case 3 : return "Dificil";
        default: return "Variado"
    }
}
helpers.get_type = (type, num)=>{
    switch (type){
        case 1 :    // Verdadero y falso
            if (num === 1){return `style="display: block;"`}
            if (num === 2){return `style="display: block;"`}
            if (num === 3){return `style="display: none;"`}
            if (num === 4){return `style="display: none;"`}
            break
        case 2 :    // 2 alternativas
            if (num === 1){return `style="display: block;"`}
            if (num === 2){return `style="display: block;"`}
            if (num === 3){return `style="display: none;"`}
            if (num === 4){return `style="display: none;"`}
            break
        case 3 :    // 3 alternativas
            if (num === 1){return `style="display: block;"`}
            if (num === 2){return `style="display: block;"`}
            if (num === 3){return `style="display: block;"`}
            if (num === 4){return `style="display: none;"`}
            break
        default:
            if (num === 1){return `style="display: block;"`}
            if (num === 2){return `style="display: block;"`}
            if (num === 3){return `style="display: block;"`}
            if (num === 4){return `style="display: block;"`}
    }
}
helpers.type = (type)=>{
    switch (type){
        case 1 : return "Verdadero o falso";
        case 2 : return "2 respuestas";
        case 3 : return "3 respuestas";
        case 4 : return "4 respuestas";
        default: return "Type Error in database"
    }
}
helpers.selected = (value, valor)=>{
    console.log(value)
    console.log(valor)
    if (value === valor){
        return ' selected '
    }else{
        return ""
    }

    //<option value="1" <% if(data.cat_id == 1){ %>selected <% } %> >Hardware</option>
    //<option value="2" <% if(data.cat_id == 2){ %>selected <% } %> >Redes</option>
    //<option value="3" <% if(data.cat_id == 3){ %>selected <% } %> >Software</option>
    //</select>


}
helpers.checkSuccessReply=(que, que_true)=>{
        return que === que_true;
}
helpers.getYear = (date)=>{
    let fecha = new Date(Date.parse(date))
    return fecha.getFullYear();
}
helpers.getDay = (date)=>{
    let fecha = new Date(Date.parse(date))
    return fecha.getDay();
}
helpers.getMonth = (date)=>{
    let fecha = new Date(Date.parse(date))
    return fecha.getMonth()
}
helpers.getOnlyDate = (date)=>{
    let fecha = new Date(Date.parse(date))
    return fecha.getDay() + "/" +fecha.getMonth() +'/' +fecha.getFullYear();
}

helpers.typeUserText=(user_id)=>{
    if (user_id === 2){
        console.log('Es estudiante')
        return "Estudiante";
    }else{
        console.log('Es docente')
        return "Docente";
    }
}
helpers.isMeExam =(id_user_exam, id_user)=>{
    console.log('user_id exam: '+ id_user_exam)
    console.log('user_id del foreach: '+ id_user)
    return id_user === id_user_exam
}
/*helpers.examExisUser =(exam, index,id_user)=>{

    if(exam[index].user_id=== id_user){
        console.log('se cumplio')
        return true
    }
    console.log('no cumplio')
    return false
}*/
// return True or False
helpers.isStudent=(user)=>{
    return user !== 2;
}
// return string personalized
helpers.isStudentText=(user, success, error)=>{
    if (user=== 2){
        return error;
    }else{
        return success;
    }
}
// return True or False
helpers.isTeacher=(user)=>{  // Verifica
    return user === 1;
}
// return string personalized
helpers.isTeacherText=(user, success, error)=>{  // Verifica
    if (user=== 1){
        return success;
    }else{
        return error;
    }
}

helpers.isQuestionTrue=(que_true, que_1, que_2, que_3, que_4)=>{

    switch (que_true){
        case 1 : return que_1;
        case 2 : return que_2;
        case 3 : return que_3;
        case 4 : return que_4;
        default: return "Error No se puedo obtener la respuesta"
    }

}
helpers.checkQuestionTrue=(que_que, que_true)=>{

    if (que_que === que_true){
        return 'checked ';
    }else{
        return "disabled";
    }
}
helpers.checkQuestionTrueMessage=(que_que, que_true, messTrue, messFalse)=>{

    if (que_que === que_true){
        return String(messTrue);
    }else{
        return String(messFalse);
    }
}
helpers.checkQuestionTrueSelected=(que_que, que_true)=>{

    if (que_que === que_true){
        return 'selected ';
    }else{
        return "";
    }
}
helpers.ifMenPicture = (gen,sub_path,  path_men, path_girl, path_other)=>{
    console.log('El genero que llegó es: '+gen)
    switch (gen){
        case 1 : return sub_path+ path_men;
        case 0 : return sub_path+ path_girl;
        default: return sub_path+ path_other
    }
}
helpers.percentage = (max, value)=>{
    return (value * 100)/max
}
helpers.note = (values, total )=>{
    return ( values* 20)/total
    //return ( values* total )/20
}
helpers.is_init = (value)=>{
    return value === 1
}
helpers.isTrue_falseNothing = (list_reply, index, que_true)=>{
    console.log('index: '+ index)
    console.log('lista por handlebarss: '+ list_reply)
    let nnew = list_reply.split(',');
    console.log(nnew[index])
    console.log(que_true)
    if (String(nnew[index]) === String(0)){
        return 'bg-warning'
    }
    if (String(nnew[index] )=== String(que_true)){
        return 'bg-success';
    }else{
        return 'bg-danger';
    }

}

helpers.getReplyUser = (list_reply, index, que_1, que_2 ,que_3, que_4)=>{
    console.log('lista que llegó de respuestas'+list_reply)
    let nnew = list_reply.split(',');

    switch (nnew[index]){
        case '1' : return que_1;
        case '2' : return que_2;
        case '3' : return que_3;
        case '4' : return que_4;
        default: return "No respondió"
    }

}


/*
helpers.ifUserR = (user_id, return_true, return_false)=>{
    console.log(user_id)
    console.log(app.locals.user)
    if (user_id=== req.user.user_id){
        return return_true;
    }else{
        return return_false;
    }

}*/
/*
helpers.get_name_user = async ( user_id) =>{

    const user_=  await pool.query('SELECT * FROM user WHERE user_id = ?', [user_id])
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    console.log(user_[0].fullname)
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')

    return String(user_[0].fullname)

    //return userr[user_id]
}
*/
module.exports = helpers;