const express = require('express');
const app = express();
const morgan = require('morgan');
require('../environments/config');
const port = process.env.HTTP_PORT;

//Middlewares
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false })); //para solo manipular formularios
app.use(express.json());

//Routes
app.use(require('./controllers/KofController'));

//Starting the server
app.listen(port, () => {
    console.log(`API listenning on port ${port}`);
})