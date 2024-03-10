const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "timalev",
  database: "muzei",
  password: "soprod12"
});
 connection.connect(function(err){
    if (err) {
       console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });



module.exports = connection