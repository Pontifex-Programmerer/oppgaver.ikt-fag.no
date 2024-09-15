const express = require('express');
const app = express();
const default_routes = require('./routes/default_routes')

const PORT = process.env.PORT || 80;


app.use(default_routes)
app.set('view engine', 'ejs');

app.listen(PORT, startApp);

function startApp(){
    console.log(`app now running at PORT: ${PORT}`)
}