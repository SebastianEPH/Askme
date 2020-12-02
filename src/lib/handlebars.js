const {format} = require('timeago.js')

const helpers = {}
// Convierte fecha a tiempo transcurrido
helpers.timeago = (timestamp)=>{
    return format(timestamp);
}
helpers.condicion = (valor1, valor2)=>{
    //switch (valor1):
    //    case 1 : console.log('texto') break;
    //    case 2 :
}

module.exports = helpers;