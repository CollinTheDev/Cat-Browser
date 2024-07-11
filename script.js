document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url');
    const goButton = document.getElementById('go');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const addFavoriteButton = document.getElementById('add-favorite');
    const iframe = document.getElementById('webpage');
    const errorMessage = document.getElementById('error-message');

    let historyStack = [];
    let currentHistoryIndex = -1;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    let domains = JSON.parse(localStorage.getItem('domains')) || {};

    const loadURL = (url) => {
        if (url === 'https://favorites.cat-browser.cat' || url === 'https://favorites.cat-browser.cat/') {
            window.location.href = 'favorites.html'; // Redirect to favorites page
            return;
        }

        if (url === 'https://cat-browser.cat' || url === 'https://cat-browser.cat/') {
            // Optionally handle the welcome page logic
            return;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }

        // Check if the URL matches a custom domain
        const domain = new URL(url).hostname;
        if (domains[domain]) {
            url = domains[domain];
        }

        iframe.src = url;
        urlInput.value = url;
        errorMessage.classList.add('hidden');
        iframe.classList.remove('hidden');
    };

    const updateHistory = (url) => {
        if (currentHistoryIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, currentHistoryIndex + 1);
        }
        historyStack.push(url);
        currentHistoryIndex++;
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
        if (url && !favorites[url]) {
            favorites[url] = url;
            localStorage.setItem('favorites', JSON.stringify(favorites));
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
});
