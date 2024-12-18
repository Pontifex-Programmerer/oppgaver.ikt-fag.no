// Geir Hilmersen
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Alias = require('../model/alias');

const {
    connectToDB
} = require('../handler/dbhandler')

getData();

function getData(){
    const dir = path.join(process.cwd(), 'data', 'alias')
    const fileList = fs.readdirSync(dir, {options: {withFileTypes: true}});
    if(Array.isArray(fileList) && fileList.length > 1){
   
        connectToDB(process.env.MONGOSTRING, 'ikt-fag')
        fileList.forEach(file => {
            const content = fs.readFileSync(path.join(dir,file), {encoding: 'utf-8'});
            const aliasArray = JSON.parse(content)
            aliasArray.forEach(entity => {
                const {alias, pool, webserver} = entity;
                const aliasEntity = new Alias({alias, pool, webserver})
    
                aliasEntity.save();

            })
        });
    } else {
        console.info('no files found in datafolder')
    }
}