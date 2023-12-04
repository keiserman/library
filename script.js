const bookGrid = document.querySelector(".book-grid");
const bookForm = document.querySelector("form");
const modal = document.querySelector("dialog");
const openButton = document.querySelector("#openModal");
const closeButton = document.querySelector("#closeModal");

const myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 234,
    read: true,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 320,
    read: false,
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

function createElementWithClass(tag, className) {
  let element = document.createElement(tag);
  element.className = className;
  return element;
}

function updateLibrary(library) {
  resetGrid();
  library.forEach((book, index) => {
    const card = createElementWithClass("div", "card");
    card.dataset.id = index;
    bookGrid.appendChild(card);

    const cardHeader = createElementWithClass("div", "card-header");
    card.appendChild(cardHeader);

    const bookTitle = createElementWithClass("p", "book-title");
    bookTitle.textContent = book.title;
    cardHeader.appendChild(bookTitle);

    const cardBody = createElementWithClass("div", "card-body");
    card.appendChild(cardBody);

    const bookAuthor = createElementWithClass("p", "book-author");
    bookAuthor.textContent = book.author;

    const bookPages = createElementWithClass("p", "book-pages");
    bookPages.textContent = book.pages;
    cardBody.appendChild(bookAuthor);
    cardBody.appendChild(bookPages);

    const buttonGroup = createElementWithClass("div", "btn-group");
    cardBody.appendChild(buttonGroup);

    const removeButton = createElementWithClass("button", "btn btn-secondary");
    removeButton.textContent = "Remove";
    removeButton.id = "remove";
    removeButton.addEventListener("click", () => removeBook(index, library));

    const readButton = createElementWithClass("button", "btn");
    if (book.read) {
      readButton.className = "btn btn-primary";
      readButton.textContent = "Read";
    } else {
      readButton.className = "btn btn-red";
      readButton.textContent = "Unread";
    }

    readButton.id = "read";
    readButton.addEventListener("click", () => {
      book.read = !book.read;
      updateLibrary(library);
    });

    buttonGroup.appendChild(readButton);
    buttonGroup.appendChild(removeButton);
  });
}

function resetGrid() {
  bookGrid.innerHTML = "";
}

function addBook(book, library) {
  library.push(book);
  updateLibrary(library);
}

function removeBook(index, library) {
  library.splice(index, 1);
  updateLibrary(library);
}

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
