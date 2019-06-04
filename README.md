# StorefrontCLI
Using Node.js &amp; MySQl to create an Amazon-like storefront.

---------------------------------------------------------------

<h3>REQUIRED PACKAGES</h3>
<ul>
    <li><a href="https://nodejs.org/en/">node.js</a></li>
    <li><a href="https://www.npmjs.com/package/mysql">mySql</a></li>
    <li><a href="https://www.npmjs.com/package/inquirer#questions">inquirer</a></li>
    <li><a href="https://www.npmjs.com/package/console.table">console.table</a></li>
    <li><a href="https://www.npmjs.com/package/chalk">Chalk</a></li>
</ul>

---------------------------------------------------------------

<h3><u>GETTING STARTED</u></h3>
You will need to install the following software and/or packages.
<ul>
    <li>node.js</li>
    <li>mySql</li>
</ul>
Contributing
Please read package.json and package-lock.json for additional details on pull requests.

---------------------------------------------------------------

<h3>DEPLOYMENT</h3>

<h4>bamazonCustomer</h4>

Creating database and inserting data from storefront.sql using mySql:
<br>
    <a href="https://youtu.be/Ze6wxsg9bFA" alt="bAmazon Database Created in Bash">YOUTUBE: bAmazon Database Created in Bash</a>
<br>

The database will return this table if succeful:
<br>
    <img src="https://github.com/RBraden3288/StorefrontCLI/blob/master/images/bamazonintable1.png?raw=true" width="500">
<br>

Using the package, console.table, we can structure the database query to look like this:
<br>
    <img src="https://github.com/RBraden3288/StorefrontCLI/blob/master/images/consoletable.png?raw=true" width="500">
<br>

Running productsForSale function to display "products" database using node.js:
<br>
    <a href="https://youtu.be/tE8kYEINle8" alt="bAmazon Javascript Deployment in Bash">YOUTUBE: bAmazon Javascript Deployment in Bash</a>
<br>

The application then checks the inventory following prompting the customer using the function "checkInventory". If the quantity that the customer wants to purchase is in stock thus rendering the order successful, the function fulfillOrder is ran and the database updates itself as such:
<br>
    <img src="https://github.com/RBraden3288/StorefrontCLI/blob/master/images/quantityUpdate.png?raw=true" width="500">
<br>

The function totalCost then displays the cost of the items by multiplying the quantity by the price.

<br>
    <img src="https://github.com/RBraden3288/StorefrontCLI/blob/master/images/price.png?raw=true" width="500">
<br>

<h4>bAmazonManager</h4>

This javascript file allows the user to act as a manager for the StorefrontCLI.

The execution of the functions:
    <ul>
        <li>viewProductsForSale()</li>
        <li>viewLowInventory()</li>
    </ul>
show how the total inventory and low inventory warning (when there is an item with less than 5 quantities remaining) is displayed for the manager:

<br>
    <img src="https://github.com/RBraden3288/StorefrontCLI/blob/master/images/mgrview.png?raw=true" width="500">
<br>

The execution of the functions:
    <ul>
        <li>addNewProduct() </li>
        <li>deleteProduct()</li>
    </ul>

produces the option to add or delete a product. Although the deleteProduct function was not a requirement, it was added in the event of an input error for the function, addNewProduct.

<br>
    <img src="https://github.com/RBraden3288/StorefrontCLI/blob/master/images/addOrDeleteProduct.png?raw=true" width="500">
<br>

---------------------------------------------------------------

<h3>RESOURCES:</h3>


---------------------------------------------------------------

<h3>ADDITIONAL COMMENTS</h3>
A UC Berkeley Extension Coding Bootcamp homework assignment




