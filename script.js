const BOOK_GRID = document.querySelector(".book-grid");
const BOOK_FORM = document.querySelector("form");
const myLibrary = [];

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#openModal");
const closeButton = document.querySelector("#closeModal");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function updateLibrary(library) {
  resetGrid();
  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
      <div class="card">
        <div class="card-header">
          <p class="book-title">${book.title}</p>
        </div>
        <div class="card-body">
          <p><strong>Author:</strong> <span class="book-author">${book.author}</span></p>
          <p><strong>Pages:</strong> <span class="book-pages">${book.pages}</span></p>
          <p><strong>Read:</strong> <span class="book-read">${book.read}</span></p>
          <button class="btn btn-secondary">Remove</button>
        </div>
      </div>
    `;
    BOOK_GRID.appendChild(bookCard);
  });
}

function resetGrid() {
  BOOK_GRID.innerHTML = "";
}

function addBook(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function removeBook() {}

BOOK_FORM.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(BOOK_FORM);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");

  addBook(title, author, pages, read);
  updateLibrary(myLibrary);
  BOOK_FORM.reset();
});
