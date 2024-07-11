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
            a.addEventListener('click', () => {
                window.open(fav, '_blank'); // Open favorite in a new tab
            });
            li.appendChild(a);
            favoritesList.appendChild(li);
        });
    };

    updateFavorites();
});
