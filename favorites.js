document.addEventListener('DOMContentLoaded', () => {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const updateFavorites = () => {
        favoritesList.innerHTML = '';
        favorites.forEach(fav => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = fav;
            a.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior
                const iframe = window.parent.document.getElementById('webpage');
                if (iframe) {
                    iframe.src = fav;
                }
            });
            li.appendChild(a);
            favoritesList.appendChild(li);
        });
    };

    updateFavorites();
});
