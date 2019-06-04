var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var chalk = require("chalk");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");  
  //call on the mgr options function to start application
  mgrOptions();
});

// Use inquirer to create a list of actions for the manager
function mgrOptions() {
    inquirer    
        .prompt({
            name: "action",
            type: "list",
            message: chalk.bold.blue("Manager Options: "),
            choices: [
                "View Products For Sale",
                "View Low Inventory",
                "Order Inventory",
                "Add New Product",
                "Exit Options"
            ]
        })
        .then (function (managerSelection) {
        //execute case by case a function depending on the user selection
            switch (managerSelection.action) {
            case "View Products For Sale":
                viewProductsForSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                orderInventory();
                break;
            case "Add New Product":
                // addNewProduct();
                break;
            case "Exit Options":
                connection.end();
                break;
            }   
        })
}

//write functions for the mgr's selection

function viewProductsForSale() {
    // list every available item: the item IDs, names, prices, and quantities.
    var queryProducts = "SELECT * FROM products";
    connection.query(queryProducts, function(error, response) {
        if (error) {
            console.log(error)
        } else {
            console.table(response);
            // return to main menu
            mgrOptions()
        }
    })

};

function viewLowInventory() {
    //list all items with an inventory count lower than five  
    var queryLowInventory = "SELECT * FROM products WHERE stock_quantity <=5";
    connection.query(queryLowInventory, function(error, response) {
        if (error) {
            console.log(error)
        } else {
            //loop through all stock_qunatity and if quantities <5, response should show it
            for (var i = 0; i < response.length; i++) {
                console.log(chalk.redBright("\nThe following items are ") +  chalk.bold.red("LOW ") + chalk.redBright("in stock: \n") +
                   (chalk.yellowBright("Item id :" + response[i].item_id + 
                    " || Product: " + response[i].product_name +
                    " || Stock_quantity: " + response[i].stock_quantity + "\n")));
                console.log(chalk.red("Order more using ") + (chalk.bold.cyan("Order Inventory")) + (chalk.red(" option in")) + (chalk.bold.magenta(" Manager Options.\n")));
                    //use inquirer to prompt manager to order more stock
                    // inquirer
                    // .prompt ({
                    //     name: "order",
                    //     message: chalk.bold.blue("Order more inventory? \n"),
                    //     type: "confirm",
                    // })
                    // .then (function(){
                    //     addToInventory();
                    // })
                //return to main menu
                mgrOptions()
            }              
        } 
    });
    // var queryAllInStock = ("SELECT * FROM products WHERE stock_quantity >5");
    // connection.query(queryAllInStock, function(error, response){
    //     if (error) {
    //         console.log(error)
    //     } else {
    //     // an else statement for stock_quantities "Everything in stock" if response >5
    //     console.log(chalk.bold.green("All items are in stock!"));
    //     mgrOptions();
    //     };
    // })
};

function orderInventory() {
    inquirer
    .prompt([
      {
        name: "itemID",
        message: chalk.bold.blue("Please enter the ID of the product to be re-stocked."),
        type: "number",
      },
      {
        name: "quantity",
        message: chalk.bold.blue("Enter order amount"),
        type: "number",
      }
    ])
    .then(function (fulfillOrder) {
        // If the the answers are inputed, we display the reponse
        var itemStoreNeeds = fulfillOrder.itemID;
        var howManyStoreNeeds = fulfillOrder.quantity;
        updateInventory(itemStoreNeeds, howManyStoreNeeds)
      });
};


function addNewProduct() {
    
};
