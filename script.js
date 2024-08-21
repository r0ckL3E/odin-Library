const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Sample books for testing
myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
myLibrary.push(new Book("1984", "George Orwell", 328, true));

// Adding a method to the Book prototype
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};


// Write a function that loops through the array and displays each book on the page.
// You can display them in some sort of table, or each on their own “card”. It might
// help for now to manually add a few books to your array so you can see the display.
function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        const title = document.createElement('h2');
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        const read = document.createElement('p');
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        card.appendChild(read);

        // Create a button to remove the book
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.dataset.index = index;
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
        card.appendChild(removeButton);

        // Create a button to toggle the read status
        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.dataset.index = index;
        toggleReadButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });
        card.appendChild(toggleReadButton);


        container.appendChild(card);


    });
}


document.getElementById('new-book-button').addEventListener('click', () => {
    document.getElementById('new-book-dialog').showModal();
});

document.getElementById('cancel-button').addEventListener('click', () => {
    document.getElementById('new-book-dialog').close();
});

document.getElementById('new-book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks();
    document.getElementById('new-book-dialog').close();
});

displayBooks();