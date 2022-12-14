//File name: route/books.js
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Add new Book - Details',
        books: books
      });
    }
  });
     

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = book({
    "Title": req.body.title,
    //"Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre

   
});

book.create(newBook, (err, book) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
       
        res.redirect('/books');
    }
});

});

});


// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let bookid = req.params.id;

  book.findById(bookid, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          
          res.render('/:id', {title: 'Edit Books'})
        
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {
  let id = req.params.id

  let update = book({
     "_id": id,
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  });

  book.updateOne({_id: id}, update, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {

          res.redirect('/books');
      }
  });




});






// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {

           res.redirect('/books');
      }
  });
});


module.exports = router;
