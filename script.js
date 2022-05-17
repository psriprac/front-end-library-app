let bookInfo = document.querySelector("#book-info");
let addBook = document.querySelector("#add-book");
let submitBook = document.querySelector("#submit-book");
// let closeCard = document.querySelectorAll("#close-card");


let myLibrary = [];

function Book (title, author, pages, readYet) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readYet = readYet;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, read? ${readYet}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    var theBook = new Book(title, author, pages, read);
    myLibrary.push(theBook);
}

function addCard(title, author, pages, read) {
    let output = document.querySelector("#output");

    let card = document.createElement("div");
    card.setAttribute("id", "card");

    let bookTitle = document.createElement("h3");
    bookTitle.setAttribute("id", "title");
    bookTitle.textContent = title;

    let closeCardButton = document.createElement("button");
    closeCardButton.setAttribute("type", "button");
    closeCardButton.setAttribute("id", "close-card");
    closeCardButton.setAttribute("onclick", "removeCard(this)");
    closeCardButton.textContent = "X";

    let bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("id", "author");
    bookAuthor.textContent = author;

    let bookPages = document.createElement("p");
    bookPages.setAttribute("id", "pages");
    bookPages.textContent = pages + " pages";

    let bookRead = document.createElement("p");
    bookRead.setAttribute("id", "read");
    bookRead.textContent = read;

    let readToggle = document.createElement("button");
    readToggle.setAttribute("type", "button");
    readToggle.setAttribute("id", "read-toggle");
    readToggle.setAttribute("onclick", "readToggle(this)");
    readToggle.textContent = "toggle";

    bookRead.appendChild(readToggle);

    card.appendChild(bookTitle);
    card.appendChild(closeCardButton);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);

    output.appendChild(card);
}

addBook.addEventListener("click", () => {
    bookInfo.classList.toggle("show");
    if(bookInfo.classList.contains("show")) {
        bookInfo.style.display = "grid";
        addBook.textContent = "Close";
    } else {
        bookInfo.style.display = "none";
        addBook.textContent = "Add a book";
    }
});

submitBook.addEventListener("click", () => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector(`input[name="read"]:checked`).value;

    document.querySelector("#book-form").reset();
    addBookToLibrary(title, author, pages, read);
    addCard(title, author, pages, read);
});

function removeCard(e) {
    if(confirm("Delete Book?")) {
        let foundBook = new Book(e.parentNode.childNodes[0].textContent, e.parentNode.childNodes[2].textContent, e.parentNode.childNodes[3].textContent, e.parentNode.childNodes[4].textContent);

        myLibrary.splice(myLibrary.findIndex(x => x.title === foundBook.title), 1);

        e.parentNode.remove();
    }
}

function readToggle(e) {
    let foundBook = new Book(e.parentNode.parentNode.childNodes[0].textContent, e.parentNode.parentNode.childNodes[2].textContent, e.parentNode.parentNode.childNodes[3].textContent, e.parentNode.parentNode.childNodes[4].textContent);

    let readToggle = document.createElement("button");
    readToggle.setAttribute("type", "button");
    readToggle.setAttribute("id", "read-toggle");
    readToggle.setAttribute("onclick", "readToggle(this)");
    readToggle.textContent = "toggle";

    if(myLibrary[myLibrary.findIndex(x => x.title === foundBook.title)].readYet == "read") {
        myLibrary[myLibrary.findIndex(x => x.title === foundBook.title)].readYet = "not read yet";
        e.parentNode.childNodes[0].textContent = "not read yet";
        targetElement = e.parentNode;
        targetElement.removeChild(targetElement.lastChild);
        targetElement.appendChild(readToggle);
    } else if (myLibrary[myLibrary.findIndex(x => x.title === foundBook.title)].readYet == "not read yet") {
        myLibrary[myLibrary.findIndex(x => x.title === foundBook.title)].readYet = "read";
        e.parentNode.childNodes[0].textContent = "read";
        targetElement = e.parentNode;
        targetElement.removeChild(targetElement.lastChild);
        targetElement.appendChild(readToggle);
    }
}

// for (let i = 0; i < closeCard.length; i++) {
//     closeCard[i].addEventListener("click", (e) => {
//         if(confirm("Delete Card?")) {
//             e.target.parentNode.remove();
//         }
//     });
// }