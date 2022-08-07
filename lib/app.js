// -- ELEMENTS -- //
const addBookButton = document.querySelector(".header-container button");
const addBookModal = document.querySelector(".add-book-modal");
const addBookForm = document.getElementById("add-book-form");
const addBookModalBg = document.querySelector(".modal-bg");
const addBookModalCloseBtn = document.querySelector(".add-book-modal-close-btn");
const addBookSubmitBtn = document.querySelector(".submit-book-btn");
const bookGrid = document.querySelector(".book-grid");

let bookFrameExitBtns = []; // updates when frames get instantiated/deleted
let bookIncrementBtns = []; // updates when frames get instantiated/deleted
let bookDecrementBtns = []; // updates when frames get instantiated/deleted
let myLibrary = [];

function Book(title, author, totalPages, hasRead) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.hasRead = hasRead;
  this.currentPage = this.hasRead == false ? 0 : this.totalPages;
  myLibrary.push(this);
}

Book.prototype.createBookFrame = function() {
  this.bookFrame = document.createElement("div");
  this.bookFrame.setAttribute("class", "book-template");

  this.bookTitle = document.createElement("h2");
  this.bookTitle.setAttribute("class", "book-title");
  this.bookTitle.textContent = `${this.title}`;

  this.bookPagesContainer = document.createElement("div");
  this.bookPagesContainer.setAttribute("class", "book-pages-container");

  this.pagesReadLabel = document.createElement("label");
  this.pagesReadLabel.textContent = `Pages: 0 / ${this.totalPages}`;

  this.incrementBtn = document.createElement("button");
  this.incrementBtn.setAttribute("class", "increment-pages");
  this.incrementBtn.textContent = "+";

  this.decrementBtn = document.createElement("button");
  this.decrementBtn.setAttribute("class", "decrement-pages");
  this.decrementBtn.textContent = "-";
  
  this.bookStatus = document.createElement("div");
  this.bookStatus.setAttribute("class", "book-status");
  this.bookStatus.classList.add(`${this.hasRead ? "complete" : "incomplete"}`);
  this.bookStatus.textContent = this.hasRead ? "Complete" : "Incomplete";

  this.bookAuthor = document.createElement("p");
  this.bookAuthor.setAttribute("class", "book-author");
  this.bookAuthor.textContent = `${this.author}`;

  this.deleteBtn = document.createElement("div");
  this.deleteBtn.setAttribute("class", "book-frame-delete-btn");

  this.bookFrame.setAttribute("id", `${myLibrary.length - 1}`);
  this.bookFrame.appendChild(this.deleteBtn);
  this.bookFrame.appendChild(this.bookTitle);
  this.bookFrame.appendChild(this.bookPagesContainer);
  this.bookFrame.appendChild(this.bookStatus);
  this.bookFrame.appendChild(this.bookAuthor);
  this.bookPagesContainer.appendChild(this.pagesReadLabel);
  this.bookPagesContainer.appendChild(this.decrementBtn);
  this.bookPagesContainer.appendChild(this.incrementBtn);
  
  bookGrid.appendChild(this.bookFrame);
  this.deleteFrameBtn = document.querySelector(".book-frame-delete-btn");
}

// delete book functions
const updateBookIndexes = (indexToUpdFrom) => {
  bookFrames = document.querySelectorAll(".book-template");
  console.log(bookFrames)
  for (let i = indexToUpdFrom; i <= myLibrary.length - 1; i++) {
    bookFrames[i].id -= 1;
    console.log(bookFrames[i])
  }
}

Book.prototype.deleteBook = function(e) {
  const bookFrame = e.target.parentNode;
  const bookIndex = bookFrame.getAttribute("id");
  myLibrary.splice(bookIndex, 1);
  bookFrame.classList.add("deleted");
  bookFrame.addEventListener("transitionend", e => {
    bookFrame.remove()
    updateBookIndexes(bookIndex)});
}

Book.prototype.updateExitBtnsNodeList = function() {
  bookFrameExitBtns = document.querySelectorAll(".book-frame-delete-btn");
  bookFrameExitBtns.forEach(btn => {
    btn.addEventListener("click", this.deleteBook);
  })
}

// increment & decrement pages read functions
Book.prototype.updateIncrementDecrementBtnsNodeList = function() {
  bookIncrementBtns = document.querySelectorAll(".increment-pages");
  bookDecrementBtns = document.querySelectorAll(".decrement-pages");
  bookIncrementBtns.forEach((btn, index) => {
    btn.addEventListener("click", this.incrementDecrementPagesRead);
    bookDecrementBtns[index].addEventListener("click", this.incrementDecrementPagesRead);
  })
  
}

const incrementDecrementPage = (action, label, index, totalPages) => {
  if (myLibrary[index].currentPage >= 0 && myLibrary[index].currentPage <= totalPages) {
    if (action == "increment") {
      if (myLibrary[index].currentPage + 1 <= totalPages) {
        label.textContent = `Pages: ${myLibrary[index].currentPage += 1} / ${totalPages}`
      }
    } else { // decrement
      if (myLibrary[index].currentPage -1 >= 0) {
        label.textContent = `Pages: ${myLibrary[index].currentPage -= 1} / ${totalPages}`
      }
    }
  }
}

Book.prototype.incrementDecrementPagesRead = function(e) {
  const actionType = e.target.className == "increment-pages" ? "increment" : "decrement";
  const pagesReadLabel = this.parentNode.parentNode.querySelector("label");
  const bookIndex = this.parentNode.parentNode.getAttribute("id");
  const totalPages = myLibrary[bookIndex].totalPages

  incrementDecrementPage(actionType, pagesReadLabel, bookIndex, totalPages);
}


// add book modal UI
const addBookModalPopup = () => {
  addBookModal.classList.add("open");
  addBookModalBg.classList.add("open");
}
const closeBookModalPopup = () => {
  addBookModal.classList.remove("open");
  addBookModalBg.classList.remove("open");
  addBookModal.addEventListener("transitionend", e => {
    // make sure event fires only on addBookModal itself and not containing children 
    e.target == addBookModal ? addBookForm.reset() : false;
  });
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
  book.createBookFrame();
  book.updateExitBtnsNodeList();
  book.updateIncrementDecrementBtnsNodeList();

  // close add book modal UI
  closeBookModalPopup();
});




// TEMP
new Book("A Game of Thrones", "George R. R. Martin", "694", false).createBookFrame();
new Book("Dune", "Frank Herbert", "412", false).createBookFrame();
new Book("Atomic Habits", "James Clear", "306", true).createBookFrame();
new Book("Atomic Habits", "James Clear", "10", false).createBookFrame();
myLibrary.forEach(book => {
  book.updateExitBtnsNodeList()
  book.updateIncrementDecrementBtnsNodeList()
})