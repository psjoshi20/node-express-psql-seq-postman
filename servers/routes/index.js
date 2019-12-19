//This is where we are going to define our API endpoints. 
import Users from './servers/controllers/user'; 
import Books from './servers/controllers/book';

export default (app) => {

     app.get('/api', (req, res) =>res.status(200).send(
         { message: 'Welcome to the BookStore API!', })); 

     app.post('/api/users', Users.signUp); // API route for user to signup 

     app.post('/api/users/:userId/books', Books.create); // API route for user to create a book

     app.get('/api/books', Books.list); // API route for user to get all books in the database ...

     app.put('/api/books/:bookId', Books.modify); // API route for user to edit a book
     
     app.delete('/api/books/:bookId', Books.delete); // API route for user to delete a book

     };

