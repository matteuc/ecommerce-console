# My First e-Commerce Console 👶 
This e-commerce console is a powerful tool for consumers, managers, and supervisors to browse and modify a vast product database (stored in a local MySQL database). Product information and sales statistics can all be viewed from the command line, making this console an invaluable program for entrepreneurs looking to manage their business.

## Table of Contents
- [Usage](#usage) 
- [Packages](#packages)
- [Consumer UI](#consumer-ui)
- [Manager UI](#manager-ui)
- [Supervisor UI](#supervisor-ui)


### Usage 
The e-commerce console can be run from the command line like this: 

First install the dependencies...
```sh
$ npm install 
```

... then run *schema.sql* on MySQL Workbench or your favorite MySQL IDE and enter your MySQL password into the *.env* file (You must create this file. Follow the format provided in *sample.env*)...

... and you are good to go!
```sh
$ node ecommerce-console
```
### Packages
The console uses multiple node packages. Their names and usage are listed below.

| API | DOCUMENTATION | FUNCTION |
| ------ | ------ | ------ |
| *colors* | https://www.npmjs.com/package/colors | Log out colored text |
| *dotenv* | https://www.npmjs.com/package/dotenv | Loading environment variables |
| *figlet* | https://www.npmjs.com/package/figlet | Log out ASCII art |
| *inquirer* | https://www.npmjs.com/package/inquirer | Pretty prompting |
| *mysql* | https://www.npmjs.com/package/mysql | Query MySQL databases|

### Consumer UI
As a consumer, you are able to shop for products by category. 
<!-- Insert screenshot of viewing categories -->

Upon choosing a category, all the products available in the category will show on the terminal. To order a product, simply type in the ID of the product you wish to purchase. You will be prompted for the desired quantity and if there are enough units available, a purchase confirmation will display.
<!-- Insert screenshot of purchase success -->
If there are less than the desired quantity in inventory, an error message and the available quantity of that product will pop up. You will not be able to place an order until you enter an available quantity.
<!-- Insert screenshot of purchase failure -->
After a successful purchase, you will be prompted to either purchase another product or exit the console.

*Upon the purchase of an item, the application will update the database and decrease that item's available quantity. It will also update the sales statistics for that product's department.*

### Manager UI
As a manager, you are able to view all available products and helpful information like: product ID, product name, product category, and product quantity remaining in inventory.
<!-- Insert screenshot of selecting viewing all inventory option -->
<!-- Insert screenshot of viewing all inventory -->
You can also view only the products with low stock (the default value is 5 units).
<!-- Insert screenshot of selecting viewing low stock -->
<!-- Insert screenshot of viewing low stock -->
From either of these two pages, you will be prompted to enter the ID of the product you would like to restock. After entering a valid ID, you will be prompted for the number of units you wish to add to inventory. Once the database has been updated, a success message will display. 
<!-- Insert screenshot of successful restocking -->

*When restocking an item, the product quantity and the overhead for that product's department are updated.*

The manager is also able to add a new product to an existing department.
<!-- Insert screenshot of selecting adding product -->
You will be prompted to enter various fields including: name, retail price (the price to the consumer), manufacturing cost (the price to the company), and the number of units to start off with.
<!-- Insert screenshot of entering information at the last question -->
Upon confirmation, a success message will display to indicate the database has been updated with the new product.
<!-- Insert screenshot showing success message -->

*When adding a new item, the inventory and the overhead cost for that product's department are updated.*


### Supervisor UI
As a supervisor, you are able to view a table showing the sales statistics of all departments including information like: department name, overhead cost, total sales, and net profit. 
<!-- Insert screenshot of selecting showing table -->
<!-- Insert screenshot showing table -->
You are also able to add a new department (for managers to add products to).
<!-- Insert screenshot of selecting create new department -->
You will be prompted to enter the name and cost to start this new department.
<!-- Insert screenshot of entering information at the last question -->
Upon confirmation, a success message will display to indicate the database has been updated with the new department.
<!-- Insert screenshot showing success message -->






