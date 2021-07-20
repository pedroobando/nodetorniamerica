const express = require('express');
const { json } = express;
const morgan = require('morgan');
const cors = require('cors');
const uploadApps = require('./uploads');
const routeApp = require('./routes');
// const pool = require('./util/cnnmssql');

const app = express();
require('dotenv').config();

const thePort = process.env.PORT || 3001;
const theHost = process.env.HOST || '0.0.0.0';

// const conn = pool.getConnection();

// middlewares
if (process.env.NODE_ENV === 'DEV') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(json());
app.use(uploadApps());

routeApp(app);

const main = () => {
  app.listen(thePort, () => {
    console.log(`http://${theHost}:${thePort}/`);
    console.log(`Starting  ${process.env.NODE_ENV} mode :-)`);
  });
};

main();
