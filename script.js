document.addEventListener('DOMContentLoaded', () => {
    const goButton = document.getElementById('go');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const addFavoriteButton = document.getElementById('add-favorite');
    const urlInput = document.getElementById('url');
    const iframe = document.getElementById('webpage');
    const errorMessage = document.getElementById('error-message');
    const searchForm = document.getElementById('search-form');
    const searchQueryInput = document.getElementById('search-query');

    // Handle URL navigation
    goButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            iframe.src = url;
        }
    });

    // Handle back navigation
    backButton.addEventListener('click', () => {
        iframe.contentWindow.history.back();
    });

    // Handle forward navigation
    forwardButton.addEventListener('click', () => {
        iframe.contentWindow.history.forward();
    });

    // Handle adding to favorites
    addFavoriteButton.addEventListener('click', () => {
        const url = iframe.src;
        if (url) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.includes(url)) {
                favorites.push(url);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        }
    });

    // Handle Google search form submission
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchQueryInput.value.trim();
        if (query) {
            iframe.src = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    });

    // Handle iframe load error
    iframe.addEventListener('load', () => {
        errorMessage.classList.add('hidden');
    });

    iframe.addEventListener('error', () => {
        errorMessage.classList.remove('hidden');
    });
});
