//const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-learning', 'root', 'webmind@123', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-learning',
//     password: 'webmind@123'

// })

//module.exports = pool.promise();