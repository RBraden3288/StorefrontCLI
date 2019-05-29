var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var chalk = require("chalk");

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

// Lists items up for sale
function productsForSale() {
  // console.log("Here are the items in stock: ");
  connection.query("SELECT * FROM products", function(err, response) {
    //if there is an error, console log the error
    if (err) {throw err;
    } else {
      // if no error log all results of the SELECT statement
      console.table(response);
    }
    //calls function that prompts customer request
    likeToBuy();
  });
}

//Prompts customer for items to purchase
function likeToBuy() {   
  inquirer
    .prompt([
      {
        name: "itemID",
        message: "Please enter the ID of the product you would like to buy.",
        type: "number",
      },
      {
        name: "quantity",
        message: "How many items would you like to buy?",
        type: "number",
      }
    ])
    .then(function (customerCart) {
      // If the the answers are inputed, we displays the reponse
      var itemCustomerWants = customerCart.itemID;
      var howManyCustomerWants = customerCart.quantity;
      checkInventory(itemCustomerWants, howManyCustomerWants)
      // fulfillOrder(itemCustomerWants, howManyCustomerWants);
    });
    // connection.end(); 
  }

  //If not, the app should log a phrase like `Insufficient quantity!`
  //prevent the order from going through
  function checkInventory(itemID, itemQuantity) {
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?",
    [itemID], 
    function(err, response){
      if (err) {
        console.log(err)
      } else {
        //displays quantity
        // console.log(response[0].stock_quantity);
        var stockQuantity = response[0].stock_quantity;
        if (itemQuantity > stockQuantity) {
          console.log(chalk.bold.red("Insufficient Quantity!"))
          productsForSale();
        } else {
          fulfillOrder(itemID, itemQuantity);
        }
      }
    })
  }

  //call this function after itemID and Quantity are requested
  function fulfillOrder (itemID, itemQuantity) {
    //"SET" manipulates value, ?'s are placeholders for values to be passed through
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    //pass in values, updates quantity if order is successful
    [itemQuantity, itemID],
    //pass in a callback function
    function(err, response){
      if (err) {
        console.log(err)
      } else {
        console.log(chalk.bold.green("Order Successful!"));
        productsForSale();
      };
    })

    
    // if your store _does_ have enough of the product, you should fulfill the customer's order
    
    // check if your store has enough of the product to meet the customer's request
    // This means updating the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.
  };
