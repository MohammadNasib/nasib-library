// console.log("this is try");



// constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// display constructor

function Display() {}

// adding methods to display prototypes

// validate function

Display.prototype.validate = function (book) {
  if (book.name.length && book.author.length >= 2 && book.type != undefined) {
    return true;
  } else {
    return false;
  }
};

// add In Local function

Display.prototype.addInLocal = function (book) {
  let booksList = localStorage.getItem("booksList");
  let tBody = document.getElementById("tBody");

  if (booksList == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(booksList);
  }

  let myObj = {
    name: book.name,
    author: book.author,
    type: book.type,
  };

  bookObj.push(myObj);
  localStorage.setItem("booksList", JSON.stringify(bookObj));

  let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;

  tBody.innerHTML += uiString;
};

// showBooks function

Display.prototype.showBooks = function () {
  let booksList = localStorage.getItem("booksList");
  let tBody = document.getElementById("tBody");

  if (booksList == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(booksList);
  }

  let uiString = " ";
  bookObj.forEach((element, index) => {
    uiString += `<tr>
              <td>${element.name}</td>
              <td>${element.author}</td>
              <td>${element.type}</td>
                 </tr>`;
  });

  if (bookObj.length != 0) {
    tBody.innerHTML += uiString;
  }
};

// clear function

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("librayForm");
  libraryForm.reset();
};

// showMessage function

Display.prototype.showMessage = function (type, givenMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                          <strong>Message:</strong> ${givenMessage}
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                      </div>`;

  setTimeout(() => {
    message.innerHTML = "";
  }, 3000);
};

// -------------------------------------------------------------------------------

// adding submit event listener to libraryForm

let libraryForm = document.getElementById("librayForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
let display = new Display();
window.onload = display.showBooks();

function libraryFormSubmit(e) {
  let name = document.getElementById("bookname").value;
  let author = document.getElementById("author").value;
  let type;

  let islamicBooks = document.getElementById("IslamicBooks");
  let programming = document.getElementById("Programming");
  let history = document.getElementById("History");
  let travel = document.getElementById("Travel");
  let arabicLiterature = document.getElementById("ArabicLiterature");

  if (islamicBooks.checked) {
    type = islamicBooks.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (history.checked) {
    type = history.value;
  } else if (travel.checked) {
    type = travel.value;
  } else if (arabicLiterature.checked) {
    type = arabicLiterature.value;
  }

  let book = new Book(name, author, type);
  e.preventDefault();

  if (display.validate(book)) {
    display.addInLocal(book);
    // display.showBooks();
    display.clear();
    display.showMessage("success", "Your book has added successfully");
  } else {
    display.showMessage(
      "danger",
      "Oops! You have to fill  'name' , 'author' and 'Type' input to add a Book."
    );
  }
}
