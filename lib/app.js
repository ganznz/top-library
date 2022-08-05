// -- ELEMENTS -- //
const addBookButton = document.querySelector(".header-container button");
const addBookModal = document.querySelector(".add-book-modal");
const addBookModalBg = document.querySelector(".modal-bg");


let myLibrary = []


const Book = (title, author, total_pages) => {
  this.title = title;
  this.author = author;
  this.total_pages = total_pages;
}

const addBookModalPopup = () => {
  addBookModal.classList.add("open")
  addBookModalBg.classList.add("open")
}
addBookButton.addEventListener("click", e => addBookModalPopup())