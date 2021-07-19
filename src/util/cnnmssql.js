const chalk = require('chalk');
// const mariadb = require('mariadb');
const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  server: process.env.SERVER_DB,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

// const dataServer = {
//   host: '192.168.10.115',
//   port: '3306',
//   user: 'root',
//   password: '123456',
//   database: 'topadministrativo',
// };

// const dataLocalhost = {
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: 'c9817803#',
//   database: 'topadministrativo',
// };

// const pool = mariadb.createPool(dataLocalhost);

const getConnection = async () => {
  try {
    console.log(chalk.cyanBright(`Conectando al SERVIDOR Base Datos Ip: ${sqlConfig.server} \n`));
    //return await sql.connect('Server=localhost/SQLTORNIAMERICA,1433;Database=SAPROD;User Id=sa;Password=123456;Encrypt=true')
    const pool = await new sql.ConnectionPool(sqlConfig);
    return await pool.connect();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getConnection };
