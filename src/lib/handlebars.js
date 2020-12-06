const {format} = require('timeago.js')

const helpers = {}
// Convierte fecha a tiempo transcurrido
helpers.timeago = (timestamp)=>{
    return format(timestamp);
}
helpers.category = (num)=>{
    switch (num){
        case 1 : return "Hardware";
        case 2 : return "Software";
        case 3 : return "Redes";
        default: return "Sin categoría"

    }
}
helpers.level = (level)=>{
    switch (level){
        case 1 : return "Inicial";
        case 2 : return "Primaria";
        case 3 : return "Secundaría";
        case 4 : return "Universidad";
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
helpers.select =(value, valor)=>{
    switch (value){
        case 1 : return "Hard";
        case 2 : return "2 respuestas";
        case 3 : return "3 respuestas";
        case 4 : return "4 respuestas";
        default: return "Error en tipo"
    }
    //<option value="1" <% if(data.cat_id == 1){ %>selected <% } %> >Hardware</option>
    //<option value="2" <% if(data.cat_id == 2){ %>selected <% } %> >Redes</option>
    //<option value="3" <% if(data.cat_id == 3){ %>selected <% } %> >Software</option>
    //</select>


}
module.exports = helpers;