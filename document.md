
express server starts localhost 3000
displyas API json messages

but not tested on postman yet

... giving problems at db:seed
syntax error due to 'import http' 

The Project -
 A basic CRUD (CREATE, READ, UPDATE AND DELETE) RESTful API .
 FrontEnd -
 Backend -

Github Repository -
 https://github.com/psjoshi20/node-express-psql-seq-postman/blob/master

Tools
List of the tools and technologies used for building our RESTful API

NodeJS — Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. Basically, we would be using this to run our javascript code on the server.

Express — This is a web application framework for Node.js which we would be using as a server for our API’s.

PostgreSQL — This is an open source object-relational database system which we would be using to save our bookstore content.The database is Bookstore.

Sequelize — This is an ORM (Object Relational Mapper) for communicating with our PostgreSQL database.

Postman — A Chrome app that we’ll use to practically test our API.

ES6 — ES6, officially known as ECMAScript 2015, is a scripting-language specification standardized created to standardize JavaScript.
Prerequisites

What’s tried in this RESTful API?
This RESTful API is  an application program interface (API) using following  HTTP requests - 
GET, PUT, POST and DELETE methods on data.

The Plan 
Create express app, include all dependencies.
Create a postgres database and a db table within it.
Create a single page API that handles all the requests.
Getting Started

Action- 
step 1- created a directory for our project. Move into the new directory and 
initialize NodeJS by running the command below
cd RestAPOinode-psgres npm init -y

step2-this would create a package.json file in our root directory.
Most browsers currently doesn’t support ES6, so we are going to make use of babel to transpile our code from ES6 to ES5 so as to run on our browser.
run the command below to set up babel

step 3
npm install babel-preset-env --save-dev 
npm install babel-cli --save 
npm install babel-core --save
run touch .babelrc to create a babel configuration file. and paste the code below
{ "presets": ["env"] }

step4-Creating our express application 
With babel setup, we can now create our RESTful API using ES6. 
To create our express application, we need to install express alongside some dependencies
npm install express body-parser morgan

step5-Create a new file named app.js to setup express
touch app.js
and paste the code below

step6- install nodemon to restart our server whenever we make changes to any of our file.
npm install --save-dev nodemon
To use nodemon, open the package.json file and update the scripts section to the code below
... "scripts": { "start": "nodemon --exec babel-node app.js", } ...
We are using nodemon to run the application and babel-node to transpile our application from ES6to ES5 on the run.
Now we can run our application with npm start command.

step7- Setup sequelize
install the sequelize library to connect to our postgreSQL database.
Install Sequelize, pg (for making the database connection) and pg-hstore (for serializing and deserializing JSON into the Postgres hstore key/value pair format):
npm install sequelize pg pg-hstore

step8 -we need to install the sequelize CLI which enable us to run database migration easily from the terminal and bootstrap a new project.
npm install -g sequelize-cli

step 9-   Next, we are going to create a config file in our root directory for sequelize named .sequelizerc. Basically, In this file, we are telling sequelize where to find to it's required files.
touch .sequelizerc
and paste the code below
const path = require('path'); module.exports = { "config": path.resolve('./server/config', 'config.json'), "models-path": path.resolve('./server/models'), "seeders-path": path.resolve('./server/seeders'), "migrations-path": path.resolve('./server/migrations') };
This sequelize configuration file is explained below -
Config: This file contains our application configuration settings such as database configuration.
Models: This is where we save our database models
Seeders: This folder saves our application seed data. Seed data are mock data used for testing or templating purpose.
Migrations: This folder would hold our application migration data
step 10 
To create the files specified in the .sequelizerc file, we are going to initialize sequelize by running sequelize init.
sequelize init
After running sequelize init command, Here is the structure of the files generated Let take a look at the index.js file generated in the server/models directory So in this file, we establish a connection to the database, grab all the model files from the current directory, add them to the db object, and apply any relations between each model (if any). This file uses development environment by default if NODE_ENV is not specified.
step 11-
We need to create our bookstore database. Run the command below to create a new database
createdb bookstore
createdb command would be available once you have postgreSQL installed on your machine.
step 12
For the config.json file in the server/config directory, edit the file to fit the code below
{ "development": { "username": "your_database_username", "password": "your_database_password", "database": "bookstore", "host": "127.0.0.1", "dialect": "postgres" }, "test": { "username": "root", "password": null, "database": "database_test", "host": "127.0.0.1", "dialect": "postgres" }, "production": { "username": "root", "password": null, "database": "database_production", "host": "127.0.0.1", "dialect": "postgres" } }
For the purpose of this tutorial, we are only going to be using the development environment.
step 13-
Models
Now, we are going to create the models for our bookstore application and define the associations. Below is the schema for our bookstore. A schema is just a blueprint of how our database is being structured.

User model
To create our user model, run the command below
sequelize model:create --name User --attributes name:string,username:string,email:string,password:string
A new user migration file would be created in the server/migration directory  database. whenever we want to undo such changes the down function would be executed when we run the sequelize db:migrate:undo:all command.
Let take a look at the user model file user.js generated in the server/models directory

We are going to refactor this file to use `ES6` and add some validation for our user models 
We also need to update our user migration file to include the changes we made to our user model file.
Open the user migration file at server/migrations/<date>-create-user-.js and update it to read the code below
module.exports = { up: (queryInterface, Sequelize) => { return queryInterface.createTable('Users', { id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER }, name: { allowNull: false, type: Sequelize.STRING }, username: { allowNull: false, type: Sequelize.STRING }, email: { allowNull: false, unique: true, type: Sequelize.STRING }, password: { type: Sequelize.STRING }, createdAt: { allowNull: false, type: Sequelize.DATE }, updatedAt: { allowNull: false, type: Sequelize.DATE } }); }, down: queryInterface /* , Sequelize */ => queryInterface.dropTable('Users') };
Book model

sequelize model:create --name Book --attributes title:string,author:string,description:string,quantity:integer,userId:integer
A book model file book.js is generated in the server/model directory 
We would also update this file to use ES6 and add some validations for our book model
export default (sequelize, DataTypes) => { const Book = sequelize.define('Book', { title: { type: DataTypes.STRING, allowNull: { args: false, msg: 'Please enter the title for your book' } }, author: { type: DataTypes.STRING, allowNull: { args: false, msg: 'Please enter an author' } }, description: { type: DataTypes.STRING, allowNull: { args: false, msg: 'Pease input a description' } }, quantity: { type: DataTypes.INTEGER, allowNull: { args: false, msg: 'Pease input a quantity' } }, userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id', as: 'userId', } } }, {}); Book.associate = (models) => { // associations can be defined here }; return Book; };
We are also going to update the books migration file at server/migrations/<date>-create-book-.js to include the changes made to the book model.
module.exports = { up: (queryInterface, Sequelize) => { return queryInterface.createTable('Books', { id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER }, title: { allowNull: false, type: Sequelize.STRING }, author: { allowNull: false, type: Sequelize.STRING }, description: { allowNull: false, type: Sequelize.STRING }, quantity: { allowNull: false, type: Sequelize.INTEGER }, userId: { type: Sequelize.INTEGER, onDelete: 'CASCADE', references: { model: 'Users', key: 'id', as: 'userId', } }, createdAt: { allowNull: false, type: Sequelize.DATE }, updatedAt: { allowNull: false, type: Sequelize.DATE } }); }, down: queryInterface /* , Sequelize */ => queryInterface.dropTable('Books') };
Association
Now, we need to define the associations between our user and book model. As a user, I should be able to have as many books as possible while a book should belong to a particular user. So our user model is going to have a One-to-many relationship with the book model while our book model would have a many-to-one relationship with the user model. You can check on the Sequelize docsfor more explanation on associations.
Edit the user.js file in the server/models directory to define the relationship between user and book as shown below
... User.associate = (models) => { // associations can be defined here User.hasMany(models.Book, { foreignKey: 'userId', }); }; return User; ...
Also, edit the `book.js` file in the `server/models` directory to define the relationship between `book` and `user` as shown below
... Book.associate = (models) => { // associations can be defined here Book.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' }); }; return User; ...
The onDelete: CASCADE ensures whenever we delete a user, the books associated with such user should also be deleted.
With the models and migrations in place, we can create those changes to the database by running the command below
Sequelize db:migrate
Controllers
With our models and database in place, we are ready to create our controllers. We would be creating a user and book controllers, The controllers would be responsible for the CRUD(CREATE, READ, UPDATE and DELETE) operations
For our user controller
Create a controllers folder in the server directory
create a user.js file in the server/controllers directory to define our user functionality which would also a user to create an account.
import model from '../models'; const { User } = model; class Users { static signUp(req, res) { const { name, username, email, password } = req.body return User .create({ name, username, email, password }) .then(userData => res.status(201).send({ success: true, message: 'User successfully created', userData })) } } export default Users;
Basically, we are importing our models object and then use object destructuring to get our user model. In our Users class, we create a method called signUp which is responsible for creating our user.
Create a routes folder in the server directory
Create an index.js file in the server/routes directory. This is where we are going to define our API endpoints. Paste the code below
import Users from '../controllers/user'; export default (app) => { app.get('/api', (req, res) => res.status(200).send({ message: 'Welcome to the BookStore API!', })); app.post('/api/users', Users.signUp); // API route for user to signup };
In this file, we are importing our Users class and defining two API endpoints.
The first endpoint which is the /api endpoint has an HTTP Method of GET which can be translated as READ in the CRUD operation.
his second endpoint which is the /api/users endpoint has an HTTP Method of POST which can be translated as CREATE in the CRUD operation. Whenever we hit this API endpoint, we are calling the signUp method from our Users class which is going to create a new user.
We need to make our application aware of the route file we just created. Open the app.js file and edit it to look like this
import http from 'http' import express from 'express' import logger from 'morgan'; import bodyParser from 'body-parser'; import routes from './server/routes'; const hostname = '127.0.0.1'; const port = 3000; const app = express() const server = http.createServer(app); app.use(logger('dev')); app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: false })); routes(app); app.get('*', (req, res) => res.status(200).send({ message: 'Welcome to the .', })); server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });
To test our API endpoint, Open up Postman and create a new user as shown below

Note when building either a production or development ready API, you are to encrypt the passwordvalue using packages like bcrypt. You should see the user data you created just now in your database.
For our book controller
Creating a book
We would be creating a controller to allow a user to create a new book. To do that, follow the steps below
create a new file named book.js in the server/controllers directory and paste the code below
import model from '../models'; const { Book } = model; class Books { static create(req, res) { const { title, author, description, quantity } = req.body const { userId } = req.params return Book .create({ title, author, description, quantity, userId }) .then(book => res.status(201).send({ message: `Your book with the title ${title} has been created successfully `, book })) } } export default Books
We need to create an API endpoint for creating a book. To do so, Open the index.js file in the server/routes directory and update the code to read this
import Users from '../controllers/user'; import Books from '../controllers/book'; export default (app) => { app.get('/api', (req, res) => res.status(200).send({ message: 'Welcome to the bookStore API!', })); app.post('/api/users', Users.signUp); // API route for user to signup app.post('/api/users/:userId/books', Books.create); // API route for user to create a book };
Note that userId is the Id of user we created earlier
Open up Postman to test the API endpoint for creating a book. as shown below

Listing all books
We would modify our book controller to enable us to get the list of all the books in our database
Open book.js in the server/controllers directory and update it to include this
... static list(req, res) { return Book .findAll() .then(books => res.status(200).send(books)); } ...
Update the index.js file in the server/routes directory to define our API for listing all books.
... app.get('/api/books', Books.list); // API route for user to get all books in the database ...
Open up postman and test the new route

Updating a book
We would modify our book controller to allow us to modify a book data in our database
Open book.js in the server/controllers directory and update it to include this
... static modify(req, res) { const { title, author, description, quantity } = req.body return Book .findById(req.params.bookId) .then((book) => { book.update({ title: title || book.title, author: author || book.author, description: description || book.description, quantity: quantity || book.quantity }) .then((updatedBook) => { res.status(200).send({ message: 'Book updated successfully', data: { title: title || updatedBook.title, author: author || updatedBook.author, description: description || updatedBook.description, quantity: quantity || updatedBook.quantity } }) }) .catch(error => res.status(400).send(error)); }) .catch(error => res.status(400).send(error)); } ...
Update the index.js file in the server/routes directory to define our API endpoint for editing a books.
... app.put('/api/books/:bookId', Books.modify); // API route for user to edit a book ...
bookId is the id of the book to be edited
Open up postman and test the new route

Deleting a book
Finally, we are going to add a functionality to delete a book
Open book.js in the server/controllers directory and update it to include this
... static delete(req, res) { return Book .findById(req.params.bookId) .then(book => { if(!book) { return res.status(400).send({ message: 'Book Not Found', }); } return book .destroy() .then(() => res.status(200).send({ message: 'Book successfully deleted' })) .catch(error => res.status(400).send(error)); }) .catch(error => res.status(400).send(error)) } ...
Update the index.js file in the server/routes directory to define our API endpoint for editing a books.
... app.delete('/api/books/:bookId', Books.delete); // API route for user to delete a book ...
Open up postman and test the new route

Reference:https://www.alibabacloud.com/blog/building-a-restful-api-with-express%2C-postgresql%2C-and-node-using-es6_594137?spm=a2c41.12245160.0.0
329

///// laptop 5432
raspberypi 5436 port for postgres
