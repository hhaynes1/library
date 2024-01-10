class Book {
    constructor(title, author, pages, haveRead, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = haveRead;
        this.index = index;
    }

    readBook() {
        this.read = true;
    }

    unreadBook() {
        this.read = false;
    }

    getIndex() {
        return this.index;
    }

    setIndex(index) {
        this.index = index;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBook(book) {
        this.library.push(book);
    }

    removeBook(index) {
        this.library.splice(index, 1);
    }

    removeAll() {
        this.library = [];
    }

    getBooks() {
        return this.library;
    }
}

const libraryDisplay = (() => {
    // create objects
    const myLibrary = new Library();

    // DOM elements
    const newBookBtn = document.querySelector('.new-book-button');
    const resetBtn = document.querySelector('.reset-library-button');
    const shelfDiv = document.querySelector('.shelf');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const numPagesInput = document.getElementById('page-count');
    const haveReadInput = document.getElementById('have-read');

    // event listeners
    newBookBtn.addEventListener('click', () => {
        // do nothing if info missing
        if (!(titleInput.value && authorInput.value && numPagesInput.value)) {
            return;
        }

        // create book
        const newBook = new Book(
            titleInput.value,
            authorInput.value,
            numPagesInput.value,
            haveReadInput.checked,
            myLibrary.getBooks().length
        );

        // add to library
        myLibrary.addBook(newBook);

        // update display
        displayLibrary();
        clearInputs();
    });

    resetBtn.addEventListener('click', () => {
        // prompt confirm
        if (!confirm("Really reset library?")) {
            return;
        }

        // clear library
        myLibrary.removeAll();

        // clear display
        clearInputs();
        let oldBooks = document.getElementsByClassName('card');
        while (oldBooks[0]) {
            oldBooks[0].parentNode.removeChild(oldBooks[0]);
        }
    });

    // functions
    function clearInputs() {
        titleInput.value = '';
        authorInput.value = '';
        numPagesInput.value = '';
        haveReadInput.checked = false;
    }

    function displayLibrary() {
        // remove old
        let oldBooks = document.getElementsByClassName('card');
        while (oldBooks[0]) {
            oldBooks[0].parentNode.removeChild(oldBooks[0]);
        }

        // populate new
        myLibrary.getBooks().forEach(book => {
            // create div card
            let div = document.createElement('div');
            div.classList.add('card');
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
                    book.unreadBook();
                } else {
                    haveReadBtn.textContent = "Read";
                    haveReadBtn.style.backgroundColor = '#D1FFBD';
                    book.readBook();
                }
            });

            let delBtn = document.createElement('button');
            delBtn.classList.add('card-delete-button');
            buttonsDiv.appendChild(delBtn);
            delBtn.textContent = "Delete";

            delBtn.addEventListener('click', () => {
                // remove from library array
                myLibrary.removeBook(book.getIndex());

                // update books indices
                let i = 0;
                myLibrary.getBooks().forEach(book => {
                    book.setIndex(i++);
                })

                // remove card
                div.remove();
            })
        });
    }
})();