// Geir Hilmersen
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Alias = require('../models/alias');

const {
    connectToDB,
    disconnectFromDB
} = require('../handlers/dbhandler')

getData();

async function getData(){
    const dir = path.join(process.cwd(), 'data', 'alias')
    const fileList = fs.readdirSync(dir, {options: {withFileTypes: true}});
    if(Array.isArray(fileList) && fileList.length > 1){
   
        await connectToDB(process.env.MONGOSTRING, 'ikt-fag');
        for(file of fileList) {
            const content = fs.readFileSync(path.join(dir,file), {encoding: 'utf-8'});
            const aliasArray = JSON.parse(content)
            for(entity of aliasArray){

                const {alias, pool, webserver, clan} = entity;
                const aliasEntity = new Alias({alias, pool, webserver, clan})
                
                try {
                    
                    const result = await aliasEntity.save();
                    if(result){
                        console.info('successfully saved', result);
                    }
                } catch(error){
                    console.log(error.message)
                }
            }
        }
        
        console.log('completed array');
        await disconnectFromDB();
    } else {
        console.info('no files found in datafolder');
    }
}