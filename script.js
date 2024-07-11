document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url');
    const goButton = document.getElementById('go');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const addFavoriteButton = document.getElementById('add-favorite');
    const iframe = document.getElementById('webpage');
    const errorMessage = document.getElementById('error-message');
    const favoritesList = document.getElementById('favorites-list');
    const favoritesPage = document.getElementById('favorites-page');
    const welcomePage = document.getElementById('welcome-page');

    let historyStack = [];
    let currentHistoryIndex = -1;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const loadURL = (url) => {
        // Normalize the URL to handle different cases
        url = url.toLowerCase().trim();

        // Handle the special URL for the favorites page
        if (url === 'https://favorites.cat-browser.cat' || url === 'https://favorites.cat-browser.cat/') {
            welcomePage.classList.add('hidden');
            favoritesPage.classList.remove('hidden');
            iframe.classList.add('hidden');
            errorMessage.classList.add('hidden');
            updateFavorites();
            return;
        }

        // Handle the special URL for the welcome page
        if (url === 'https://cat-browser.cat' || url === 'https://cat-browser.cat/') {
            welcomePage.classList.remove('hidden');
            favoritesPage.classList.add('hidden');
            iframe.classList.add('hidden');
            errorMessage.classList.add('hidden');
            return;
        }

        // Load other URLs
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        iframe.src = url;
        urlInput.value = url;
        errorMessage.classList.add('hidden');
        welcomePage.classList.add('hidden');
        favoritesPage.classList.add('hidden');
        iframe.classList.remove('hidden');
    };

    const updateHistory = (url) => {
        if (currentHistoryIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, currentHistoryIndex + 1);
        }
        historyStack.push(url);
        currentHistoryIndex++;
    };

    const updateFavorites = () => {
        favoritesList.innerHTML = '';
        favorites.forEach(fav => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = fav;
            a.addEventListener('click', () => {
                loadURL(fav);
                updateHistory(fav);
            });
            li.appendChild(a);
            favoritesList.appendChild(li);
        });
    };

    goButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        loadURL(url);
        updateHistory(url);
    });

    backButton.addEventListener('click', () => {
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
            loadURL(historyStack[currentHistoryIndex]);
        }
    });

    forwardButton.addEventListener('click', () => {
        if (currentHistoryIndex < historyStack.length - 1) {
            currentHistoryIndex++;
            loadURL(historyStack[currentHistoryIndex]);
        }
    });

    addFavoriteButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url && !favorites.includes(url)) {
            favorites.push(url);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavorites();
        }
    });

    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            goButton.click();
        }
    });

    iframe.addEventListener('load', () => {
        if (iframe.contentDocument && iframe.contentDocument.body.innerHTML.includes('X-Frame-Options')) {
            errorMessage.classList.remove('hidden');
            iframe.classList.add('hidden');
        } else {
            iframe.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        }
    });

    iframe.addEventListener('error', () => {
        errorMessage.classList.remove('hidden');
        iframe.classList.add('hidden');
    });

    // Load initial welcome page and favorites
    loadURL('https://cat-browser.cat');  // Initial load to show the welcome page
});
