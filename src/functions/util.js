const util ={}

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








module.exports = util;




