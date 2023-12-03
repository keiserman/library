const BOOK_GRID = document.querySelector(".book-grid");
const BOOK_FORM = document.querySelector("form");
const MODAL = document.querySelector("dialog");
const OPEN_BUTTON = document.querySelector("#openModal");
const CLOSE_BUTTON = document.querySelector("#closeModal");

const myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 234,
    read: "yes",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 320,
    read: "yes",
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

OPEN_BUTTON.addEventListener("click", () => {
  MODAL.showModal();
});

CLOSE_BUTTON.addEventListener("click", () => {
  MODAL.close();
});

function updateLibrary(library) {
  resetGrid();
  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
      <div class="card" data-id="${index}">
        <div class="card-header">
          <p class="book-title">${book.title}</p>
        </div>
        <div class="card-body">
          <p><strong>Author:</strong> <span class="book-author">${book.author}</span></p>
          <p><strong>Pages:</strong> <span class="book-pages">${book.pages}</span></p>
          <p><strong>Read:</strong> <span class="book-read">${book.read}</span></p>
          <button id="removeBook" class="btn btn-secondary">Remove</button>
        </div>
      </div>
    `;
    bookCard.addEventListener("click", (event) => {
      if (event.target.matches("#removeBook")) {
        removeBook(index, library);
      }
    });
    BOOK_GRID.appendChild(bookCard);
  });
}

function resetGrid() {
  BOOK_GRID.innerHTML = "";
}

function addBook(book, library) {
  library.push(book);
  updateLibrary(library);
}

function removeBook(index, library) {
  library.splice(index, 1);
  updateLibrary(library);
}

BOOK_FORM.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(BOOK_FORM);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");

  let book = new Book(title, author, pages, read);

  addBook(book, myLibrary);
  BOOK_FORM.reset();
});

updateLibrary(myLibrary);
