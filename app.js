//counter
let i = -1;
//book storage
let myLibrary = [];

const DOMElement = (function () {
    const form = document.body.querySelector('form');
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const tableBody = document.querySelector('tbody');
    const bookCounter = document.querySelector('.book-counter');
    const submitButton = document.querySelector('#submit');
    const lightModeButton = document.querySelector('.light-mode');
    const darkModeButton = document.querySelector('.dark-mode');
    return {
        form,
        titleInput,
        authorInput,
        tableBody,
        submitButton,
        bookCounter,
        lightModeButton,
        darkModeButton
    }
})();

const submitButtonDisabled = (function () {
    DOMElement.submitButton.disabled = true;
})();

const events = (function () {
    DOMElement.titleInput.addEventListener('input', function () {
        if (DOMElement.titleInput.value.length && DOMElement.authorInput.value.length)
            DOMElement.submitButton.disabled = false;
        else
            DOMElement.submitButton.disabled = true;
    })
    DOMElement.authorInput.addEventListener('input', function () {
        if (DOMElement.titleInput.value.length && DOMElement.authorInput.value.length)
            DOMElement.submitButton.disabled = false;
        else
            DOMElement.submitButton.disabled = true;
    })
    DOMElement.lightModeButton.addEventListener('click', () => {
        document.body.classList.remove('dark-theme-variables');
    })
    DOMElement.darkModeButton.addEventListener('click', () => {
        document.body.classList.add('dark-theme-variables');
    })
})();

class Book {
    constructor(title, author, status) {
        this.title = title;
        this.author = author;
        this.status = status;
    }
}

DOMElement.form.addEventListener('submit', function (e) {
    e.preventDefault();

    i++;

    const book = (createBook(getInputFromUser(this).input.title,
        getInputFromUser(this).input.author,
        getInputFromUser(this).input.status).book);

    myLibrary.push(book);

    const argsBookDetails = [
        createTable().tableDataForTitle,
        createTable().tableDataForAuthor,
        createButton().statusButton,
        createButton().deleteButton
    ];

    addBookContents(myLibrary, ...argsBookDetails);

    const argsReflectDOM = [
        createTable().tableRowForTableData,
        createTable().tableDataForStatusButton,
        createTable().tableDataForDeleteButton,
        argsBookDetails[0],
        argsBookDetails[1],
        argsBookDetails[2],
        argsBookDetails[3],
    ];

    reflectDOM(i, ...argsReflectDOM);

    addClassMethod(argsBookDetails[2], book);
    book.addEventListenerStatusButton();

    addEventListenerDeleteButton(...argsReflectDOM);

    DOMElement.bookCounter.textContent = ` ${myLibrary.length}`;
    DOMElement.titleInput.value = '';
    DOMElement.authorInput.value = '';
    DOMElement.submitButton.disabled = true;
})

const getInputFromUser = (function (form) {
    const getInputFromUser = new FormData(form);
    const input = Object.fromEntries(getInputFromUser);
    return { input };
});

const createBook = (function (title, author, bookStatus) {
    const book = new Book(title, author, bookStatus);
    return { book };
});

const addClassMethod = function (statusButton, book) {
    Book.prototype.addEventListenerStatusButton = function () {
        statusButton.addEventListener('click', function () {
            if (this.textContent === 'Read') {
                this.textContent = 'Unread';
                book.status = 'Unread';
            }
            else if (this.textContent === 'Unread') {
                this.textContent = 'Read';
                book.status = 'Read';
            }
        });
    }
};

const createTable = (function () {
    const tableDataForTitle = document.createElement('td');
    const tableDataForAuthor = document.createElement('td');
    const tableDataForStatusButton = document.createElement('td');
    const tableDataForDeleteButton = document.createElement('td');
    const tableRowForTableData = document.createElement('tr');
    return {
        tableDataForTitle,
        tableDataForAuthor,
        tableDataForStatusButton,
        tableDataForDeleteButton,
        tableRowForTableData
    }
});

const createButton = (function () {
    const statusButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    return {
        statusButton,
        deleteButton
    }
});

const addBookContents = function (myLibrary, ...argsBookDetails) {
    argsBookDetails[0].textContent = myLibrary[i].title;
    argsBookDetails[1].textContent = myLibrary[i].author;
    argsBookDetails[2].textContent = myLibrary[i].status;
    argsBookDetails[3].innerHTML = ('<span class="material-symbols-sharp text-danger">delete</span>');
    return argsBookDetails[0], argsBookDetails[1], argsBookDetails[2], argsBookDetails[3]
};

const reflectDOM = function (i, ...argsReflectDOM) {
    argsReflectDOM[0].setAttribute('id', `${i}`);
    argsReflectDOM[0].appendChild(argsReflectDOM[3]);
    argsReflectDOM[0].appendChild(argsReflectDOM[4]);
    argsReflectDOM[1].appendChild(argsReflectDOM[5]);
    argsReflectDOM[0].appendChild(argsReflectDOM[1]);
    argsReflectDOM[2].appendChild(argsReflectDOM[6]);
    argsReflectDOM[0].appendChild(argsReflectDOM[2]);

    argsReflectDOM[1].style.width = '120px';
    argsReflectDOM[2].style.width = '50px';
    argsReflectDOM[5].style.width = '100px';

    argsReflectDOM[5].classList.add('btn', 'd-flex', 'justify-content-center', 'border', 'border-secondary');
    argsReflectDOM[6].classList.add('btn', 'd-flex', 'align-items-center', 'p-0', 'm-auto');

    DOMElement.tableBody.appendChild(argsReflectDOM[0]);
}

const addEventListenerDeleteButton = function (...argsReflectDOM) {
    argsReflectDOM[6].addEventListener('click', function () {
        let current = argsReflectDOM[0];
        let nextSibling = current.nextElementSibling;
        while (nextSibling) {
            nextSibling.setAttribute('id', `${nextSibling.id - 1}`);
            nextSibling = nextSibling.nextElementSibling;
        };
        myLibrary.splice(argsReflectDOM[0].id, 1);
        argsReflectDOM[0].remove();

        DOMElement.bookCounter.textContent = ` ${myLibrary.length}`;
        i--;
    })
}