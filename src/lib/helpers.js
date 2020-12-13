const helpers = {}
const bcrypt = require('bcryptjs')
helpers.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return finalpassword = bcrypt.hash(password,salt )
}
helpers.matchPassport = async (password, savedPasspord)=>{
    try{
        await bcrypt.compare(password, savedPasspord);
    }catch (e){
        console.log(e)
    }

}



module.exports = helpers;