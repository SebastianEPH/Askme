const {format} = require('timeago.js')
const pool = require('../database') // async


const helpers = {}
// Convierte fecha a tiempo transcurrido
helpers.timeago = (timestamp)=>{
    const g = "0000-00-04T04:00:00.000Z"
    return format(timestamp-g);
}
helpers.get_faculty =(id)=>{
    switch (id){
        case 1 : return "Agropecuaria y nutrición";
        case 2 : return "Ciencias";
        case 3 : return "Ciencias empresariales";
        case 4 : return "Ciencias sociales y humanidades";
        case 5 : return "Educación Inicial";
        case 6 : return "Pedagogía y cultura física";
        case 7 : return "Tecnología";
        default: return "Sin Facultad"
    }
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
helpers.return_user_name= (id, obj_user)=>{
    try {
        for (let i = 0; i < obj_user.length; i++) {
            if(String(obj_user[i].user_id ) === String(id)){
                return obj_user[i].user_fullname
            }
        }
    }catch (e) {
        console.log(e)
        return "username_err"
    }

}
helpers.istrue_=(exam_id , exam_user_id)=>{
    console.log('primero: '+exam_id)
    console.log('segundo: '+ exam_user_id)
    return  String(exam_id) === String(exam_user_id)
}
helpers.isMeExam =(id_user_exam, id_user)=>{
    console.log('user_id exam: '+ id_user_exam)
    console.log('user_id del foreach: '+ id_user)
    return id_user === id_user_exam
}
helpers.date_beautiful= (date)=>{
    if (date === "" || date === null){
        return ""
    }
    return  format(new Date(date)); // January 12th 2021, 8:18:05 pm
}
helpers.date_string= (date)=>{
    const date_ = new Date(String(date))
    return  date_.toDateString() //date_.getFullYear() + "/"+ date_.getMonth() + "/"+ date_.getDay()
}
helpers.text_minus = (text)=>{
    text = String(text)
    return text.toLowerCase();
}
helpers.getFaculty = (id_caulty, obj_faculty)=>{
    try {
        for (let i = 0; i < obj_faculty.length; i++) {
            if(String(obj_faculty[i].id ) === String(id_caulty)){
                return obj_faculty[i].faculty
            }
        }
    }catch (e) {
        console.log(e)
        return "faculty_err"
    }

}
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
    const numero =  ( values* 20)/total
    //return ( values* total )/
    if (isNaN(numero)){
    } else {
        if (numero % 1 === 0) {
            return numero
        } else {
            return Number.parseFloat(numero).toFixed(1);
        }
    }

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
module.exports = helpers;