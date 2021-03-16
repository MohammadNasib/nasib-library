console.log("this is es6 class");

/* 

#  Further Features

1. Store all the data in localstorage----------- done
2. Add a delete button in another column
3. Add a scroll bar to the view

*/

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  validate(book) {
    if (book.name.length && book.author.length >= 2 && book.type != undefined) {
      return true;
    } else {
      return false;
    }
  }

  addInLocal(book) {
    let booksList = localStorage.getItem("booksList");
    let bookObj;

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

    this.showBooks();
  }

  showBooks() {
    let booksList = localStorage.getItem("booksList");
    let tBody = document.getElementById("tBody");
    let bookObj;

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
                </td>
                  </tr>`;
    });

    if (bookObj.length != 0) {
      tBody.innerHTML = uiString;
    }
  }

  formClear() {
    let libraryForm = document.getElementById("librayForm");
    libraryForm.reset();
  }

  showMessage(type, givenMessage) {
    let message = document.getElementById("message");
    let txt;
    if (type == "success") {
      txt = "Success";
    } else {
      txt = "Error";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${txt}:</strong> ${givenMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;

    setTimeout(() => {
      message.innerHTML = "";
    }, 3000);
  }
}

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

  let book1 = new Book(name, author, type);
  e.preventDefault();

  if (display.validate(book1)) {
    display.addInLocal(book1);
    display.formClear();
    display.showMessage("success", "Your book has added successfully");
  } else {
    display.showMessage(
      "danger",
      "Oops! You have to fill  'name' , 'author' and 'Type' input to add a Book."
    );
  }
}
