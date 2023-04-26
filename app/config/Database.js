require('dotenv').config();
let DBConnectorSetting = [
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    dialect: 'postgres',
  },
];

module.exports = DBConnectorSetting;
