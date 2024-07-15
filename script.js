document.addEventListener('DOMContentLoaded', () => {
    const goButton = document.getElementById('go');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const addFavoriteButton = document.getElementById('add-favorite');
    const urlInput = document.getElementById('url');
    const iframe = document.getElementById('webpage');
    const errorMessage = document.getElementById('error-message');
    const userId = 'defaultUser';  // Replace with actual user management if needed

    // Load and apply saved theme
    db.collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.theme) {
                document.getElementById('theme-link').href = data.theme;
            }
        }
    });

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
            db.collection('users').doc(userId).update({
                favorites: firebase.firestore.FieldValue.arrayUnion(url)
            });
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
