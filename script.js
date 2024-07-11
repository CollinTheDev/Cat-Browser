document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url');
    const goButton = document.getElementById('go');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const addFavoriteButton = document.getElementById('add-favorite');
    const iframe = document.getElementById('webpage');
    const errorMessage = document.getElementById('error-message');
    const favoritesList = document.getElementById('favorites-list');
    const favoritesContainer = document.getElementById('favorites');
    const welcomePage = document.getElementById('welcome-page');

    let historyStack = [];
    let currentHistoryIndex = -1;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const loadURL = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        iframe.src = url;
        urlInput.value = url;
        errorMessage.classList.add('hidden');
        welcomePage.classList.add('hidden');
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
        if (favorites.length > 0) {
            favoritesContainer.classList.remove('hidden');
        } else {
            favoritesContainer.classList.add('hidden');
        }
    };

    goButton.addEventListener('click', () => {
        const url = urlInput.value;
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
        const url = urlInput.value;
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
        if (iframe.contentDocument.body.innerHTML.includes('X-Frame-Options')) {
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
    welcomePage.classList.remove('hidden');
    iframe.classList.add('hidden');
    updateFavorites();
});
