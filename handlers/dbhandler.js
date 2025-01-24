const mongoose = require('mongoose');
let db = null;

async function connectToDB(mongostring, dbName){
    try {
        console.info(`attempting connection to database: ${mongostring}`)
         db = await mongoose.connect(mongostring, {dbName});
    } catch (error) {
        console.error('Error when connecting to database', error.message);
    } finally {
        if(db){
            console.info('Successfully connected to ', mongostring)
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