const mongoose = require('mongoose');

async function connectToDB(mongostring, dbName){
    let result = null;
    try {
        console.info(`attempting connection to database: ${mongostring}`)
         result = await mongoose.connect(mongostring, {dbName});
    } catch (error) {
        console.error('Error when connecting to database', error.message);
    } finally {
        if(result){
            console.info('Successfully connected to ', mongostring)
        }
    }
}

module.exports={
    connectToDB
}