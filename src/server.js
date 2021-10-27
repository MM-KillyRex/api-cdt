require('dotenv').config();
const express = require('express');
const cors = require('cors');

const dbHelper = require('./helpers/db.helper');
const mainRoutes = require('./routes/index.route');

const clientErrorHandler = require('./middlewares/clientError.handler');
const errorHandler = require('./middlewares/error.handler');
const logErrors = require('./middlewares/logErrors.handler');
const port = process.env.HTTP_PORT;

require('./environments/config');


const app = express();

app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, API-Key, u'
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(mainRoutes);

  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);

//Starting the server
app.listen(port, () => {
  console.log(`API listenning on port ${port}`);
})
