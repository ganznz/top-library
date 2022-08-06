// -- ELEMENTS -- //
const addBookButton = document.querySelector(".header-container button");
const addBookModal = document.querySelector(".add-book-modal");
const addBookForm = document.getElementById("add-book-form");
const addBookModalBg = document.querySelector(".modal-bg");
const addBookModalCloseBtn = document.querySelector(".add-book-modal-close-btn");
const addBookSubmitBtn = document.querySelector(".submit-book-btn");
const bookGrid = document.querySelector(".book-grid");
let bookFrameExitBtns = []; // updates when frames get instantiated/deleted

let myLibrary = [];

function Book(title, author, totalPages, haveRead) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.haveRead = haveRead;
  myLibrary.push(this);
}

Book.prototype.createBookFrame = function() {
  const bookFrame = document.createElement("div");
  bookFrame.setAttribute("class", "book-template");

  const bookTitle = document.createElement("h2");
  bookTitle.setAttribute("class", "book-title");
  bookTitle.textContent = `${this.title}`;

  const pagesReadLabel = document.createElement("label");
  pagesReadLabel.textContent = `Pages: 0 / ${this.totalPages}`;

  const incrementBtn = document.createElement("button");
  incrementBtn.setAttribute("class", "increment-pages");
  incrementBtn.textContent = "+";

  const decrementBtn = document.createElement("button");
  decrementBtn.setAttribute("class", "decrement-pages");
  decrementBtn.textContent = "-";
  
  const bookStatus = document.createElement("div");
  bookStatus.setAttribute("class", "book-status");
  bookStatus.classList.add(`${this.haveRead ? "complete" : "incomplete"}`);
  bookStatus.textContent = this.haveRead ? "Complete" : "Incomplete";

  const bookAuthor = document.createElement("p");
  bookAuthor.setAttribute("class", "book-author");
  bookAuthor.textContent = `${this.author}`;

  const deleteBtn = document.createElement("div");
  deleteBtn.setAttribute("class", "book-frame-delete-btn");

  bookFrame.setAttribute("id", `${myLibrary.length - 1}`);
  bookFrame.appendChild(deleteBtn);
  bookFrame.appendChild(bookTitle);
  bookFrame.appendChild(pagesReadLabel);
  bookFrame.appendChild(bookStatus);
  bookFrame.appendChild(bookAuthor);
  pagesReadLabel.appendChild(decrementBtn);
  pagesReadLabel.appendChild(incrementBtn);
  bookGrid.appendChild(bookFrame);
}

Book.prototype.updateExitBtnsNodeList = function() {
  bookFrameExitBtns = document.querySelectorAll(".book-frame-delete-btn")
  console.log(bookFrameExitBtns)
}

// add book modal popup
const addBookModalPopup = () => {
  addBookModal.classList.add("open");
  addBookModalBg.classList.add("open");
}

const closeBookModalPopup = () => {
  addBookModal.classList.remove("open");
  addBookModalBg.classList.remove("open");
}

addBookButton.addEventListener("click", e => addBookModalPopup());
addBookModalCloseBtn.addEventListener("click", e => closeBookModalPopup());

// create book frame
addBookForm.addEventListener("submit", e => {
  e.preventDefault()
  const formData = new FormData(addBookForm)
  const bookTitle = formData.get('title');
  const bookAuthor = formData.get('author');
  const bookPages = formData.get('total_pages');
  const bookStatus = formData.get('have_read') == "on" ? true : false;
  
  // instantiates book frame
  const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  book.createBookFrame()
  book.updateExitBtnsNodeList()
});

bookFrameExitBtns.forEach(btn => {
  btn.addEventListener("click", e => console.log(e))
})