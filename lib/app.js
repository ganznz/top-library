// -- ELEMENTS -- //
const addBookButton = document.querySelector(".header-container button");
const addBookModal = document.querySelector(".add-book-modal");
const addBookForm = document.getElementById("add-book-form");
const dupedBookWarningText = document.getElementById("duped-warning-text");
const addBookModalBg = document.querySelector(".modal-bg");
const addBookModalCloseBtn = document.querySelector(".add-book-modal-close-btn");
const addBookSubmitBtn = document.querySelector(".submit-book-btn");
const addBookModalTitleInput = document.querySelector("#title");
const bookGrid = document.querySelector(".book-grid");
const booksAddedText = document.querySelector(".books-added-amt"); 
const booksCompletedText = document.querySelector(".books-completed-amt");
const pagesReadText = document.querySelector(".pages-read-amt");

let bookFrameExitBtns = []; // updates when frames get instantiated/deleted
let bookIncrementBtns = []; // updates when frames get instantiated/deleted
let bookDecrementBtns = []; // updates when frames get instantiated/deleted
let myLibrary = [];
let booksAdded = 0;
let booksCompleted = 0;
let pagesRead = 0;
let pagesTotal = 0;

class Book {
  constructor(title, author, totalPages, hasRead) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.hasRead = hasRead;
    this.currentPage = this.hasRead == false ? 0 : this.totalPages;
    myLibrary.push(this);
  }

  createBookFrame() {
    this.bookFrame = document.createElement("div");
    this.bookFrame.setAttribute("class", "book-template");
  
    this.bookTitle = document.createElement("h2");
    this.bookTitle.setAttribute("class", "book-title");
    this.bookTitle.textContent = `${this.title}`;
  
    this.bookPagesContainer = document.createElement("div");
    this.bookPagesContainer.setAttribute("class", "book-pages-container");
  
    this.pagesReadLabel = document.createElement("label");
    
    this.hasRead ?
    this.pagesReadLabel.textContent = `Pages: ${this.totalPages} / ${this.totalPages}`
    : this.pagesReadLabel.textContent = `Pages: 0 / ${this.totalPages}`
  
    this.incrementBtn = document.createElement("button");
    this.incrementBtn.setAttribute("class", "increment-pages");
    this.incrementBtn.textContent = "+";
  
    this.decrementBtn = document.createElement("button");
    this.decrementBtn.setAttribute("class", "decrement-pages");
    this.decrementBtn.textContent = "-";
    
    this.bookStatus = document.createElement("div");
    this.bookStatus.setAttribute("class", "book-status");
    this.bookStatus.classList.add(`${this.hasRead ? "complete" : "incomplete"}`);
  
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

  deleteBook(e) {
    const bookFrame = e.target.parentNode;
    const bookIndex = bookFrame.getAttribute("id");
    const bookObj = myLibrary[bookIndex]
  
    booksAdded--;
    booksAddedText.textContent = booksAdded;
    pagesTotal -= bookObj.totalPages;
    bookObj.hasRead ? booksCompleted-- : false;
    booksCompletedText.textContent = `${booksCompleted} / ${booksAdded}`;
    pagesRead -= bookObj.currentPage;
    pagesReadText.textContent = `${pagesRead} / ${pagesTotal}`;
  
    myLibrary.splice(bookIndex, 1);
    bookFrame.remove();
    updateBookIndexes(bookIndex);
  }

  updateExitBtnsNodeList() {
    bookFrameExitBtns = document.querySelectorAll(".book-frame-delete-btn");
    bookFrameExitBtns.forEach(btn => {
      btn.addEventListener("click", this.deleteBook);
    });
  }

  // increment & decrement pages read functions
  updateIncrementDecrementBtnsNodeList() {
    bookIncrementBtns = document.querySelectorAll(".increment-pages");
    bookDecrementBtns = document.querySelectorAll(".decrement-pages");
    bookIncrementBtns.forEach((btn, index) => {
      btn.addEventListener("click", this.incrementDecrementPagesRead);
      bookDecrementBtns[index].addEventListener("click", this.incrementDecrementPagesRead);
    });
  }

  incrementDecrementPagesRead(e) {
    const actionType = e.target.className == "increment-pages" ? "increment" : "decrement";
    const pagesReadLabel = this.parentNode.querySelector("label");
    const bookIndex = this.parentNode.parentNode.getAttribute("id");
    const totalPages = myLibrary[bookIndex].totalPages
    const bookStatus = this.parentNode.parentNode.querySelector(".book-status");
  
    incrementDecrementPage(actionType, pagesReadLabel, bookIndex, totalPages);
  
    pagesReadText.textContent = `${pagesRead} / ${pagesTotal}`;
  
    if (myLibrary[bookIndex].currentPage == totalPages) {
      bookStatus.classList.add("complete");
      bookStatus.classList.remove("incomplete");
      booksCompleted = document.querySelectorAll(".complete").length;
      myLibrary[bookIndex].hasRead = true;
    } else {
      bookStatus.classList.add("incomplete");
      bookStatus.classList.remove("complete");
      booksCompleted = document.querySelectorAll(".complete").length;
      myLibrary[bookIndex].hasRead = false;
    }
    booksCompletedText.textContent = `${booksCompleted} / ${booksAdded}`;
  }
  
}

// delete book functions
const updateBookIndexes = (indexToUpdFrom) => {
  bookFrames = document.querySelectorAll(".book-template");
  for (let i = indexToUpdFrom; i < myLibrary.length; i++) {
    console.log(bookFrames[i].id);
    bookFrames[i].id--;
  }
}

const incrementDecrementPage = (action, label, index, totalPages) => {
  if (myLibrary[index].currentPage >= 0 && myLibrary[index].currentPage <= totalPages) {
    if (action == "increment") {
      if (myLibrary[index].currentPage + 1 <= totalPages) {
        label.textContent = `Pages: ${myLibrary[index].currentPage += 1} / ${totalPages}`
        pagesRead += 1;
      }
    } else { // decrement
      if (myLibrary[index].currentPage -1 >= 0) {
        label.textContent = `Pages: ${myLibrary[index].currentPage -= 1} / ${totalPages}`
        pagesRead--;
      }
    }
    pagesReadText.textContent = `${pagesRead} / ${pagesTotal}`;
  }
}

// update information panel
const updateInfoPanel = bookObj => {
  booksAdded += 1;
  bookObj.hasRead ? booksCompleted += 1 : false;
  bookObj.hasRead ? pagesRead += bookObj.totalPages : false  
  pagesTotal += bookObj.totalPages;

  booksAddedText.textContent = booksAdded;
  booksCompletedText.textContent = `${booksCompleted} / ${booksAdded}`;
  pagesReadText.textContent = `${pagesRead} / ${pagesTotal}`;  
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
  const bookPages = parseInt(formData.get('total_pages'));
  const bookStatus = formData.get('have_read') == "on" ? true : false;
  
  // instantiates book frame
  bookAlreadyAdded = false;
  for (addedBook of myLibrary) { // prevents book duplication
    if (addedBook.title == bookTitle) {
      bookAlreadyAdded = true;
      break;
    }
  }
  if (!bookAlreadyAdded) {
    const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    addBookModalTitleInput.classList.remove("dupe-book-warning");
    dupedBookWarningText.classList.remove("dupe-book-warning");
    book.createBookFrame();
    book.updateExitBtnsNodeList();
    book.updateIncrementDecrementBtnsNodeList();
    updateInfoPanel(book);
    closeBookModalPopup();
  } else {
    addBookModalTitleInput.classList.add("dupe-book-warning");
    dupedBookWarningText.classList.add("dupe-book-warning");
  }
});