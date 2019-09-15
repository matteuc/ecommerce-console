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

![Signing in as a consumer.](/images/select-consumer.PNG "Signing in as a consumer.")

As a consumer, you are able to shop for products by category. 

![Choosing a product category.](/images/category-consumer.PNG "Choosing a product category")

Upon choosing a category, all the products available in the category will show on the terminal. To order a product, simply type in the ID of the product you wish to purchase. You will be prompted for the desired quantity and if there are enough units available, a purchase confirmation will display. After a successful purchase, you will be prompted to either purchase another product or exit the console.

![A successful product purchase.](/images/purchaseSuccess-consumer.PNG "A successful product purchase.")

If there are less than the desired quantity in inventory, an error message and the available quantity of that product will pop up. You will not be able to place an order until you enter an available quantity.

![A failed product purchase.](/images/purchaseError-consumer.PNG "A failed product purchase.")

*Upon the purchase of an item, the application will update the database and decrease that item's available quantity. It will also update the sales statistics for that product's department.*

### Manager UI

![Signing in as a manager.](/images/select-manager.PNG "Signing in as a manager.")

As a manager, you are able to view all available products and helpful information like: product ID, product name, product category, and product quantity remaining in inventory.

![Selecting 'View All Products'.](/images/viewAll-manager.PNG "Selecting 'View All Products'.")

![Viewing All Products.](/images/allProducts-manager.PNG "Viewing All Products.")

You can also view only the products with low stock (the default value is 5 units).

![Selecting 'View Low Stock'.](/images/viewLow-manager.PNG "Selecting 'View Low Stock'.")

![Viewing Low Stock.](/images/lowProducts-manager.PNG "Viewing Low Stock.")

From either of these two pages, you will be prompted to enter the ID of the product you would like to restock. After entering a valid ID, you will be prompted for the number of units you wish to add to inventory. Once the database has been updated, a success message will display. 

![Successfully restocking an item.](/images/restockSuccess.PNG "Successfully restocking an item.")

*When restocking an item, the product quantity and the overhead for that product's department are updated.*

The manager is also able to add a new product to an existing department.

![Selecting 'Add New Products'.](/images/addNew-manager.PNG "Selecting 'Add New Products'.")

You will be prompted to enter various fields including: name, retail price (the price to the consumer), manufacturing cost (the price to the company), and the number of units to start off with.

![New Product Questions](/images/newProduct-manager.PNG "New Product Questions")

Upon confirmation, a success message will display to indicate the database has been updated with the new product.

![Successful Product Creation.](/images/addNewSuccess-manager.PNG "Successful Product Creation.")

*When adding a new item, the inventory and the overhead cost for that product's department are updated.*


### Supervisor UI

![Signing in as a supervisor.](/images/select-supervisor.PNG "Signing in as a supervisor.")

As a supervisor, you are able to view a table showing the sales statistics of all departments including information like: department name, overhead cost, total sales, and net profit. 
![Selecting 'View All Department Sales'.](/images/viewTable-supervisor.PNG "Selecting 'Add New Products'.")

![Viewing All Department Sales.](/images/showTable-supervisor.PNG "Viewing All Department Sales.")

You are also able to add a new department (for managers to add products to).

![Selecting 'Add a New Department'.](/images/createDepartment-supervisor.PNG "Selecting 'Add a New Department'.")

You will be prompted to enter the name and cost to start this new department.

![New Department Questions](/images/createDepartmentQuestions.PNG "New Department Questions")

Upon confirmation, a success message will display to indicate the database has been updated with the new department.

![Successful Department Creation.](/images/createDepartmentSuccess.PNG "Successful Department Creation.")





