let sortedGames = [];
let currentSort = '';

function sortGames(criteria) {
    currentSort = criteria;

    if (criteria === 'az') {
        sortedGames = [...gamesData].sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'za') {
        sortedGames = [...gamesData].sort((a, b) => b.title.localeCompare(a.title));
    } else if (criteria === 'priceLowHigh') {
        sortedGames = [...gamesData].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
        sortedGames = [];
    }

    currentPage = 1;
    renderGames();
    setupPagination((sortedGames.length || gamesData.length));
}

document.getElementById('sort-options').addEventListener('change', (e) => {
    sortGames(e.target.value);
});