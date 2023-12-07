const bookGrid = document.querySelector(".book-grid");
const bookForm = document.querySelector("form");
const modal = document.querySelector("dialog");
const openButton = document.querySelector("#openModal");
const closeButton = document.querySelector("#closeModal");
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Functions

function createElementWithClass(tag, className) {
  let element = document.createElement(tag);
  element.className = className;
  return element;
}

function updateLibrary(library) {
  resetGrid(bookGrid);
  library.forEach((book, index) => {
    const bookCard = createElementWithClass("div", "card");
    const cardHeader = createElementWithClass("div", "card-header");
    const bookTitle = createElementWithClass("p", "book-title");
    const cardBody = createElementWithClass("div", "card-body");
    const bookAuthor = createElementWithClass("p", "book-author");
    const bookPages = createElementWithClass("p", "book-pages");
    const buttonGroup = createElementWithClass("div", "btn-group");
    const readButton = createElementWithClass("button", "btn");
    const removeButton = createElementWithClass("button", "btn btn-secondary");

    bookCard.dataset.id = index;
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;

    readButton.id = "read";
    readButton.addEventListener("click", () => {
      book.toggleRead();
      updateLibrary(library);
    });

    if (book.read) {
      readButton.className = "btn btn-primary";
      readButton.textContent = "Read";
    } else {
      readButton.className = "btn btn-red";
      readButton.textContent = "Unread";
    }

    removeButton.textContent = "Remove";
    removeButton.id = "remove";
    removeButton.addEventListener("click", () => removeBook(index, library));

    bookGrid.appendChild(bookCard);
    bookCard.appendChild(cardHeader);
    cardHeader.appendChild(bookTitle);
    bookCard.appendChild(cardBody);
    cardBody.appendChild(bookAuthor);
    cardBody.appendChild(bookPages);
    cardBody.appendChild(buttonGroup);
    buttonGroup.appendChild(readButton);
    buttonGroup.appendChild(removeButton);
  });
}

function resetGrid(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function addBook(book, library) {
  library.push(book);
  updateLibrary(library);
}

function removeBook(index, library) {
  library.splice(index, 1);
  updateLibrary(library);
}

// Event Listeners

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  bookForm.reset();
  modal.close();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read") === "read";

  let book = new Book(title, author, pages, read);

  addBook(book, myLibrary);
  bookForm.reset();
  modal.close();
});

updateLibrary(myLibrary);
