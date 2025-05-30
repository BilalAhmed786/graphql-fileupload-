const {Pool} = require('pg')

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    port:"5432",
    password:"saifi.135",
    database:"appoloserver"

})
 pool.connect((error)=>{

    if(error){

        console.log(error)
    }else{

        console.log('connected')
    }

})

module.exports = pool