document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url');
    const goButton = document.getElementById('go');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const iframe = document.getElementById('webpage');
    const errorMessage = document.getElementById('error-message');

    let historyStack = [];
    let currentHistoryIndex = -1;

    const loadURL = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        iframe.src = url;
        urlInput.value = url;
        errorMessage.classList.add('hidden');
    };

    const updateHistory = (url) => {
        if (currentHistoryIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, currentHistoryIndex + 1);
        }
        historyStack.push(url);
        currentHistoryIndex++;
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

    // Load initial blank page
    loadURL('about:blank');
});
