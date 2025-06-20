let sortedGames = [];
let currentSort = '';
let selectedPlatform = '';
let selectedGenre = '';
let minPrice = 0;
let maxPrice = 100;

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

document.getElementById('sort-platforms').addEventListener('change', (e) => {
    selectedPlatform = e.target.value;
    currentPage = 1;
    renderGames();
});

document.getElementById('sort-genre').addEventListener('change', (e) => {
    selectedGenre = e.target.value;
    currentPage = 1;
    renderGames();
});

const minSlider = document.getElementById('minPrice');
const maxSlider = document.getElementById('maxPrice');

minSlider.addEventListener('input', () => {
    minPrice = parseFloat(minSlider.value);
    currentPage = 1;
    renderGames();
});

maxSlider.addEventListener('input', () => {
    maxPrice = parseFloat(maxSlider.value);
    currentPage = 1;
    renderGames();
});

const minRangeInput = document.getElementById('minPrice');
const minRangeOutput = document.getElementById('showMinPrice');
const maxRangeInput = document.getElementById('maxPrice');
const maxRangeOutput = document.getElementById('showMaxPrice');

// Set initial value
minRangeOutput.textContent = minRangeInput.value;
maxRangeOutput.textContent = maxRangeInput.value;

minRangeInput.addEventListener('input', function() {
minRangeOutput.textContent = this.value;
}),
maxRangeInput.addEventListener('input', function() {
maxRangeOutput.textContent = this.value;
});