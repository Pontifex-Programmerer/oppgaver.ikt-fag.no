require('dotenv').config();
const express = require('express');
const app = express();
const default_routes = require('./routes/default_routes');
const alias_routes = require('./routes/alias_routes');
const user_routes = require('./routes/user_routes');

const session = require('express-session');
const path = require('path');
const {connectToDB} = require('./handlers/dbhandler')

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(default_routes);
app.use(alias_routes);
app.use(user_routes);

app.listen(PORT, startApp);

async function startApp(){
    const DBNAME = process.env.DBNAME;
    const DBSTRING = process.env.MONGOSTRING;
    console.info('Startup routine initated!');
    try {
        await connectToDB(DBSTRING, DBNAME);
        console.info(`\noppgaver.ikt-fag.no now running at PORT: ${PORT}`);
        console.info(`\tStartup time: ${new Date().toLocaleTimeString()}`)
    } catch(error) {
        console.error('Error connecting to Database\n', error.message);
    }
}