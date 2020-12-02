const {format} = require('timeago.js')

const helpers = {}
// Convierte fecha a tiempo transcurrido
helpers.timeago = (timestamp)=>{
    return timeagoInstance.format(timestamp);
}

module.exports = helpers;