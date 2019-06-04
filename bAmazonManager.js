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
                "View Low Inventory/Order Inventory",
                "Order Inventory",
                "Add New Product",
                "Delete From Iventory",
                "Exit Options"
            ]
        })
        .then (function (managerSelection) {
        //execute case by case a function depending on the user selection
            switch (managerSelection.action) {
            case "View Products For Sale":
                viewProductsForSale();
                break;
            case "View Low Inventory/Order Inventory":
                viewLowInventory();
                break;
            case "Order Inventory":
                orderInventory()
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Delete From Iventory":
                deleteProduct();
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
                console.log(chalk.red("Redirecting to order form: ") + (chalk.bold.cyan("Order Inventory")) + (chalk.red(".........")));
                // directs to orderinventory();
                orderInventory();
            }              
        } 
    });
    //display a message if stock >5
    console.log(chalk.bold.greenBright("\nEverything is in stock!\n"));
    mgrOptions();
};

function orderInventory() {
    inquirer
    .prompt([
      {
        name: "itemID",
        message: chalk.bold.yellow("To exit order form: control+c.") + 
                 chalk.bold.cyan("\nOtherwise, \nplease enter the ID of the product to be re-stocked."),
        type: "number",
      },
      {
        name: "quantity",
        message: chalk.bold.cyan("Enter total quantity needed."),
        type: "number",
      }
    ])
    .then(function updateInventory(mgrUpdate) {
        var itemStoreNeeds = mgrUpdate.itemID;
        var howManyStoreNeeds = mgrUpdate.quantity;
        console.log(chalk.bold.yellow("\nYou are ordering " + howManyStoreNeeds + " unit(s) of item id#:" + itemStoreNeeds + "\n\n"));
        console.log(chalk.green("Updating inventory......................"));
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: howManyStoreNeeds
              },
              {
                item_id: itemStoreNeeds
              }
            ],
            function(err, res) {
              console.log(res.affectedRows + " products updated!\n");
            }
          );
        // logs the actual query being run
        console.log(query.sql);  
        // If the the answers are inputed, we display the reponse
        //direct to viewProducts to show new inventory
        console.log(chalk.bold.redBright("\n\nReview updated inventory:\n"));
        viewProductsForSale();
      });
};

function addNewProduct() {
    inquirer
        .prompt([
          {
            name: "productName",
            message: chalk.bold.blue("Enter new product name"),
            type: "input",
          },
          {
            name: "department",
            message: chalk.bold.blue("Enter items' department."),
            type: "input",
          },
          {
            name: "price",
            message: chalk.bold.blue("Enter items' price."),
            type: "number",
          },
          {
            name: "quantity",
            message: chalk.bold.blue("Enter items' quantity."),
            type: "number",
          }
        ])
        .then (function addItem(newItem) {
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: newItem.productName,
                  department_name: newItem.department,
                  price: newItem.price,
                  stock_quantity: newItem.quantity,
                },
                function(err, res) {
                  console.log(res.affectedRows + " product inserted!\n");
                  console.log(chalk.bold.redBright("\n\nReview updated inventory:\n"));
                  viewProductsForSale();
                }
            );     
          // logs the actual query being run
            console.log(query.sql);
        })   
}

function deleteProduct() {
    console.log(chalk.bold.redBright("WARNING!! You are about to delete a product."))
    inquirer
            .prompt([
              {
                name: "productID",
                message: chalk.bold.blue("Enter item id of product to be removed: "),
                type: "number",
              }
            ])
    .then (function deleteItem(remove){
        connection.query(
          "DELETE FROM products WHERE ?",
          {
            item_id: remove.productID
          },
          function(err, res) {
            console.log(res.affectedRows + " products deleted!\n");
            console.log(chalk.bold.redBright("\n\nReview updated inventory:\n"));
            viewProductsForSale();
          }
        )
    })
}
