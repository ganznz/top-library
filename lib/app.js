// -- ELEMENTS -- //
const addBookButton = document.querySelector(".header-container button");
const addBookModal = document.querySelector(".add-book-modal");
const addBookModalBg = document.querySelector(".modal-bg");
const addBookModalCloseBtn = document.querySelector(".add-book-modal-close-btn");
const bookGrid = document.querySelector(".book-grid");

let myLibrary = [];

const Book = (title, author, total_pages) => {
  this.title = title;
  this.author = author;
  this.total_pages = total_pages;
}

// add book modal
const addBookModalPopup = () => {
  addBookModal.classList.add("open");
  addBookModalBg.classList.add("open");
}
addBookButton.addEventListener("click", e => addBookModalPopup());

const closeBookModalPopup = () => {
  addBookModal.classList.remove("open");
  addBookModalBg.classList.remove("open");
}
addBookModalCloseBtn.addEventListener("click", e => closeBookModalPopup());

// add book to library
const createBookFrame = () => {
  const bookFrame = document.createElement("div");
  bookFrame.setAttribute("class", "book-template");

  const bookTitle = document.createElement("h2");
  bookTitle.setAttribute("class", "book-title")
  bookTitle.textContent = "A Game of Thrones";

  const pagesReadLabel = document.createElement("label");
  pagesReadLabel.textContent = "Pages: 0 / 0";

  const incrementBtn = document.createElement("button");
  incrementBtn.setAttribute("class", "increment-pages");
  incrementBtn.textContent = "+";

  const decrementBtn = document.createElement("button");
  decrementBtn.setAttribute("class", "decrement-pages");
  decrementBtn.textContent = "-";
  
  const bookStatus = document.createElement("div");
  bookStatus.setAttribute("class", "book-status");
  bookStatus.textContent = "Incomplete";

  const bookAuthor = document.createElement("p");
  bookAuthor.setAttribute("class", "book-author");
  bookAuthor.textContent = "George R. R. Martin";

  bookFrame.appendChild(bookTitle);
  bookFrame.appendChild(pagesReadLabel);
  bookFrame.appendChild(bookStatus);
  bookFrame.appendChild(bookAuthor);
  pagesReadLabel.appendChild(decrementBtn);
  pagesReadLabel.appendChild(incrementBtn);
  bookGrid.appendChild(bookFrame);
}


const addBookToLibrary = () => {

}