const {format} = require('timeago.js')

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
        default: return "Sin categoría"
    }
}
helpers.level = (level)=>{
    switch (level){
        case 1 : return "Facil";
        case 2 : return "Intermedio";
        case 3 : return "Dificil";
        default: return "level Error in database"
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
        if (que === que_true){
            return true;
        }else{
            return false;
        }
}

helpers.typeUserText=(user)=>{
    console.log(user)
    if (user.type_id === 2){
        console.log('Es estudiante')
        return "Estudiante";
    }else{
        console.log('Es docente')
        return "Docente";
    }
}
helpers.isStudent=(user)=>{  // Verifica
    console.log(user)
    if (user.type_id === 1){
        console.log('Es Docente')
        return false;
    }else{
        console.log('Es Estudiante')
        return true;
    }
}
helpers.isTeacher=(user)=>{  // Verifica
    console.log(user)
    if (user.type_id === 1){
        console.log('Es Docente')
        return true;
    }else{
        console.log('Es Estudiante')
        return false;
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

module.exports = helpers;