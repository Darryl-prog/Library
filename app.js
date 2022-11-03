const input = document.querySelectorAll('input');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const submitButton = document.querySelector('#submit');
const select = document.querySelector('select');
const bookCounter = document.querySelector('.book-counter');
const lightModeButton = document.querySelector('.light-mode');
const darkModeButton = document.querySelector('.dark-mode');

let i = -1;
submitButton.disabled = true;
let myLibrary = [];

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
}

function addBookToLibrary() {
    i++;

    let bookInfo = [];
    input.forEach((el) => {
        bookInfo.push(el.value)
    })

    bookInfo.push(select.options[select.selectedIndex].value);

    const book = new Book(bookInfo[0], bookInfo[1], bookInfo[2]);

    Book.prototype.info = function () {
        statusButton.addEventListener('click', function () {
            if (statusButton.textContent === 'Read') {
                statusButton.textContent = 'Unread';
                book.status = 'Unread';
            }
            else if (statusButton.textContent === 'Unread') {
                statusButton.textContent = 'Read';
                book.status = 'Read';
            }
        })
    }

    myLibrary.push(book);

    const tdTitle = document.createElement('td');
    const tdAuthor = document.createElement('td');
    const tdStatusButton = document.createElement('td');
    const tr = document.createElement('tr');
    const tbody = document.querySelector('tbody');
    tdStatusButton.style.width = '120px';

    const tdDeleteButton = document.createElement('td');
    tdDeleteButton.style.width = '50px';

    const statusButton = document.createElement('button');
    statusButton.classList.add('btn', 'd-flex', 'justify-content-center', 'border', 'border-secondary');
    statusButton.style.width = '100px';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'd-flex', 'align-items-center', 'p-0', 'm-auto');

    tdTitle.textContent = myLibrary[i].title;
    tdAuthor.textContent = myLibrary[i].author;
    statusButton.textContent = myLibrary[i].status;
    deleteButton.innerHTML = ('<span class="material-symbols-sharp text-danger">delete</span>');

    tr.setAttribute('id', `${i}`);

    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tdStatusButton.appendChild(statusButton)
    tr.appendChild(tdStatusButton);
    tdDeleteButton.appendChild(deleteButton);
    tr.appendChild(tdDeleteButton);
    tbody.appendChild(tr);

    deleteButton.addEventListener('click', function () {
        let current = tr;
        let nextSibling = current.nextElementSibling;
        while (nextSibling) {
            nextSibling.setAttribute('id', `${nextSibling.id - 1}`);
            nextSibling = nextSibling.nextElementSibling;
        }
        myLibrary.splice(tr.id, 1)
        tr.remove();
        i--;
        bookCounter.textContent = ` ${myLibrary.length}`;
    })

    input.forEach((el) => { el.value = ''; })
    book.info();
    bookCounter.textContent = ` ${myLibrary.length}`;
}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    addBookToLibrary();
    submitButton.disabled = true;
})
titleInput.addEventListener('input', function () {
    if (titleInput.value.length && authorInput.value.length)
        submitButton.disabled = false;
    else
        submitButton.disabled = true;
})
authorInput.addEventListener('input', function () {
    if (titleInput.value.length && authorInput.value.length)
        submitButton.disabled = false;
    else
        submitButton.disabled = true;
})
lightModeButton.addEventListener('click', () => {
    document.body.classList.remove('dark-theme-variables');
})
darkModeButton.addEventListener('click', () => {
    document.body.classList.add('dark-theme-variables');
})

