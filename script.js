// initialization
const newBookBtn = document.querySelector('.new-book-button');
const resetBtn = document.querySelector('.reset-library-button');
const shelfDiv = document.querySelector('.shelf');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const numPagesInput = document.getElementById('page-count');
const haveReadInput = document.getElementById('have-read');

const myLibrary = [];
let libraryIndex = 0;

// constructor
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = haveRead;
    this.index = libraryIndex;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages,
         ${haveRead ? 'already read.' : 'not read yet.'}`;
    }
}


// event listeners
newBookBtn.addEventListener('click', () => {
    // do nothing if info missing
    if (!(titleInput.value && authorInput.value && numPagesInput.value)) {
        return;
    }

    // create book
    const newBook = new Book(titleInput.value,
        authorInput.value, numPagesInput.value, haveReadInput.checked);

    // increment library index
    libraryIndex += 1;
    console.log(`libraryIndex: ${libraryIndex}`);

    // add to library
    addBookToLibrary(newBook);

    // update shelf
    displayLibrary();

    // clear input fields
    clearInputs();
});

resetBtn.addEventListener('click', () => {
    // prompt confirm
    if (!confirm("Really reset library?")) {
        return;
    }

    clearInputs();

    // clear library
    myLibrary.length = 0;
    libraryIndex = 0;
    let oldBooks = document.getElementsByClassName('card');
    while (oldBooks[0]) {
        oldBooks[0].parentNode.removeChild(oldBooks[0]);
    }
})


// functions
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    // remove old
    let oldBooks = document.getElementsByClassName('card');
    while (oldBooks[0]) {
        oldBooks[0].parentNode.removeChild(oldBooks[0]);
    }

    // populate new
    myLibrary.forEach(book => {
        // create div card
        let div = document.createElement('div');
        div.classList.add('card');

        // add to shelf
        shelfDiv.appendChild(div);

        // create and add parts of book card
        let titleText = document.createElement('h2');
        titleText.textContent = `${book.title} by ${book.author}`;
        div.appendChild(titleText);

        let pagesText = document.createElement('p');
        pagesText.textContent = `${book.pages} page${book.pages > 1 ? 's' : ''}.`;
        div.appendChild(pagesText);

        // buttons
        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('card-buttons');
        div.appendChild(buttonsDiv);

        let haveReadBtn = document.createElement('button');
        haveReadBtn.classList.add('card-read-button');
        buttonsDiv.appendChild(haveReadBtn);
        if (book.read) {
            haveReadBtn.textContent = "Read";
            haveReadBtn.style.backgroundColor = '#D1FFBD';
        } else {
            haveReadBtn.textContent = "Not Read";
            haveReadBtn.style.backgroundColor = '#FFCCCB';
        }

        haveReadBtn.addEventListener('click', () => {
            if (book.read) {
                haveReadBtn.textContent = "Not Read";
                haveReadBtn.style.backgroundColor = '#FFCCCB';
                book.read = false;
            } else {
                haveReadBtn.textContent = "Read";
                haveReadBtn.style.backgroundColor = '#D1FFBD';
                book.read = true;
            }
        });

        let delBtn = document.createElement('button');
        delBtn.classList.add('card-delete-button');
        buttonsDiv.appendChild(delBtn);
        delBtn.textContent = "Delete";

        delBtn.addEventListener('click', () => {
            // remove from library array
            myLibrary.splice(book.index, 1);

            // update library indices
            updateLibraryIndex();

            // remove card
            div.remove();
        })
    });
}

function clearInputs() {
    titleInput.value = '';
    authorInput.value = '';
    numPagesInput.value = '';
    haveReadInput.checked = false;
}

function updateLibraryIndex() {
    libraryIndex = 0;
    myLibrary.forEach(book => {
        book.index = libraryIndex;
        libraryIndex++;
    })
}

// TEST ------------------
const alice = new Book('Alice in Wonderland', 'Lewis Caroll', 200, false);
libraryIndex++;
const raven = new Book('The Raven', 'Edgar Allan Poe', 6, true);
libraryIndex++;
const leagues = new Book('20,000 Leagues Under The Sea', 'Jules Verne', 308, true);
libraryIndex++;
const fahrenheit = new Book('Fahrenheit 451', 'Ray Bradbury', 281, true);
libraryIndex++;

addBookToLibrary(alice);
addBookToLibrary(raven);
addBookToLibrary(leagues);
addBookToLibrary(fahrenheit);
displayLibrary();

// console.log(`Library contains: ${myLibrary.length} books`);
// console.log(alice.info());



