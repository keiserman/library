const BOOK_GRID = document.querySelector(".book-grid");

const myLibrary = [
  {
    title: "Harry Potter",
    author: "J. K. Rowling",
    pages: "223",
    read: "Yes",
  },
  {
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    pages: "310",
    read: "Yes",
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    pages: "662",
    read: "Yes",
  },
  {
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    pages: "694",
    read: "No",
  },
];

const template = document.getElementById("book-card-template").content;

myLibrary.forEach((book) => {
  const bookCard = document.importNode(template, true);

  bookCard.querySelector(".book-title").textContent = book.title;
  bookCard.querySelector(".book-author").textContent = book.author;
  bookCard.querySelector(".book-pages").textContent = book.pages;
  bookCard.querySelector(".book-read").textContent = book.read;

  document.querySelector(".book-grid").appendChild(bookCard);
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let title = prompt("What is the book title?");
  let author = prompt("Who is the author?");
  let pages = prompt("How many pages is it?");
  let read = prompt("Did you read the book?");
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}
