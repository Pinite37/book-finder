const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

async function searchBooks(query) {
    try {
        const response = await fetch(`${API_URL}${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function fetchBookById(bookId) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}