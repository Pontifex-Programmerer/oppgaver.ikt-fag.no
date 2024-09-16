const express = require('express');
const app = express();
const default_routes = require('./routes/default_routes');
const path = require('path');

const PORT = process.env.PORT || 80;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(default_routes);

app.listen(PORT, startApp);

function startApp(){
    console.log(`app now running at PORT: ${PORT}`)
}