const chalk = require('chalk');
const mariadb = require('mariadb');

const dataServer = {
  host: 'ADMARIA',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'topadministrativo',
};

const dataLocalhost = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'c9817803#',
  database: 'topadministrativo',
};

const pool = mariadb.createPool(dataServer);

const getConnection = async () => {
  try {
    console.log(
      chalk.cyanBright(
        `Conectando a SERVIDOR MariaDb Ip: ${dataServer.host} / port: ${dataServer.port}\n`
      )
    );
    return await pool.getConnection();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getConnection };
