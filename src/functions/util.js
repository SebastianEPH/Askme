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
    return string.split(separator);
}
util.random = (arr)=>{
    return arr[Math.floor(Math.random() * arr.length)]
}
util.calcule_note = (values, total ) =>{
    const note = ( values* 20)/total
    return note.toFixed(2)
}

util.compare_date_init = (date_init) =>{
    if (date_init === null){
        return true
    }
    return new Date() > new Date(date_init);
}
util.compare_date_finish = (date_finish) =>{
    if (date_finish === null){
        return false
    }
    return new Date() > new Date(date_finish);
}
util.date_beautiful= (date)=>{
    return  format(new Date(date)); // January 12th 2021, 8:18:05 pm
}


module.exports = util;




