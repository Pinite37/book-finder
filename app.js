document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (query) {
        try {
            const books = await searchBooks(query);
            displayResults(books);
        } catch (error) {
            console.error('Error fetching books:', error);
            displayError(error);
        }
    }
});

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (!books || books.length === 0) {
        resultsDiv.innerHTML = '<p>No books found.</p>';
        return;
    }
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autheur Inconnu'}</p>
            <button class="buttons" onclick="addToFavorites('${book.id}')">Ajouter aux Favoris</button>
        `;
        resultsDiv.appendChild(bookElement);
    });
}

function displayError(error) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p class="error">${error.message}</p>`;
}

function addToFavorites(bookId) {
    const favorites = getFavorites();
    if (!favorites.includes(bookId)) {
        favorites.push(bookId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function displayFavorites() {
    const favoritesDiv = document.getElementById('favorites');
    const favorites = getFavorites();
    favoritesDiv.innerHTML = '';
    favorites.forEach(async bookId => {
        const book = await fetchBookById(bookId); 
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autheur Inconnus'}</p>
            <button class="buttons" onclick="removeFromFavorites('${book.id}')">Supprimer des Favoris</button>
        `;
        favoritesDiv.appendChild(bookElement);
    });
}

function removeFromFavorites(bookId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== bookId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

document.addEventListener('DOMContentLoaded', displayFavorites);
