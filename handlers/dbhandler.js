const mongoose = require('mongoose');
let db = null;

async function connectToDB(mongostring, dbName){
    try {
        console.info(`attempting connection to database: \n    - ${mongostring}${dbName}`)
         db = await mongoose.connect(mongostring, {dbName, autoIndex:true});
    } catch (error) {
        console.error('FAILURE: Error when connecting to database', error.message);
    } finally {
        if(db){
            console.info('SUCCESS: connection established - ', mongostring)
        }
    }
}

async function disconnectFromDB(){
    if(db){
        try {

            await mongoose.disconnect();
            console.info('Disconnected from db')
        } catch(error){
            console.error(error.message);
        }
    }
}

module.exports={
    connectToDB,
    disconnectFromDB
}