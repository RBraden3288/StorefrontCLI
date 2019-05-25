var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  productsForSale();
});

function productsForSale() {
  console.log("Items in stock: ");
  connection.query("SELECT * FROM products", function(err, response) {
    //if there is an error, console log the error
    if (err) throw err;
    // if no error log all results of the SELECT statement
    console.log(response);
    connection.end();
  });
};
