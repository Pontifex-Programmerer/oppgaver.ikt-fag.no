require('dotenv').config();
const express = require('express');
const app = express();
const default_routes = require('./routes/default_routes');
const path = require('path');
const {connectToDB} = require('./handlers/dbhandler');

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(default_routes);

app.listen(PORT, startApp);

function startApp(){
    connectToDB(process.env.MONGOSTRING);
    console.log(`app now running at PORT: ${PORT}`)
}