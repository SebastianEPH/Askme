const util ={}
const moment = require('moment')
const{ format, render, cancel, register } = require('timeago.js');

// Elimina un datos de un array
util.removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
    return arr
}
util.string_to_array = (string, separator )=>{
    //if (string.length === "" || string.length === 0  ){
    //    return 0
    //}
    return string.split(separator);
}
util.get_current_date_db = ()=>{
    let current_date = new Date()
    return current_date.getFullYear() + '-'+ (parseInt(current_date.getMonth()) +1 )+ '-'+current_date.getDate()+ ' '+current_date.toLocaleTimeString()
}
util.parse_date_for_db = (date)=>{
    let current_date = new Date(date)
    return current_date.getFullYear() + '-'+ (parseInt(current_date.getMonth()) +1 )+ '-'+current_date.getDate()+ ' '+current_date.toLocaleTimeString()
}
util.addTime=  (time)=>{   // Agrega más tiempo a una fecha establecida // retorna uan Date()

    let current_date= new Date()
    let only_date = current_date.getFullYear() + '-'+ (parseInt(current_date.getMonth()) +1 )+ '-'+current_date.getDate()
    let only_time = current_date.toLocaleTimeString()

    let fecha = new Date(only_date + " "+ only_time)
    //let fecha = new Date(date)
    let  fecha_1 = moment(fecha)
    console.log(fecha_1)

    let final = fecha_1.add(time, 'hours')

    console.log('esta es la fecha final: '+final)
    return new Date(String(final))

}
util.random = (arr)=>{
    return arr[Math.floor(Math.random() * arr.length)]
}
util.calcule_note = (values, total ) =>{
    const note = ( values* 20)/total
    return note.toFixed(2)
}

util.compare_date_init = (date_init) =>{
    if (date_init === null){return true}   // vertificado
    return util.get_current_date_db() > util.parse_date_for_db(date_init)
}// Devuelve true si el tiempo es mayor que la hora de inicio o si es null
util.compare_date_finish = (date_finish) =>{
    if (date_finish === null){return false}
    return util.get_current_date_db() > util.parse_date_for_db(date_finish)
}// Devuelve true, solo si el tiempo finalizó // si es null False
util.date_beautiful= (date)=>{
    return  format(new Date(date)); // January 12th 2021, 8:18:05 pm
}


module.exports = util;




