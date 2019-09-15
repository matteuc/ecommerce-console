console.log('Loading...');

exports.SQL_config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_SECRET,
    database: "ecommercedatabase"
}