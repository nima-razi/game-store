let sortedGames = [];
let currentSort = '';
let selectedPlatform = '';
let selectedGenre = '';
let selectedDeveloper = '';
let selectedPublisher = '';
let selectedRating = '';
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
    } else if (criteria === 'priceHighLow') {
        sortedGames = [...gamesData].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
        sortedGames = [];
    }

    currentPage = 1;
    renderGames();
    setupPagination((sortedGames.length || gamesData.length));
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('data/games.json')
    .then(response => response.json())
    .then(games => {
        const publisherSet = new Set();
        const developerSet = new Set();
        const ratingSet = new Set();
        const genreSet = new Set();
        const platformSet = new Set();
        
        games.forEach(game => {
            (Array.isArray(game.publisher) ? game.publisher : [game.publisher])
            .forEach(p => publisherSet.add(p));
            
            (Array.isArray(game.developer) ? game.developer : [game.developer])
            .forEach(d => developerSet.add(d));

            (Array.isArray(game.rating) ? game.rating : [game.rating])
            .forEach(r => ratingSet.add(r));

            (Array.isArray(game.genre) ? game.genre : [game.genre])
            .forEach(g => genreSet.add(g));

            (Array.isArray(game.platforms) ? game.platforms : [game.platforms])
            .forEach(g => platformSet.add(g));
        });
        
        populateSelect("sort-publisher", Array.from(publisherSet).sort());
        populateSelect("sort-developer", Array.from(developerSet).sort());
        populateSelect("sort-rating", Array.from(ratingSet).sort());
        populateSelect("sort-genre", Array.from(genreSet).sort());
        populateSelect("sort-platforms", Array.from(platformSet).sort());
    })
    
    .catch(error => console.error("Error loading JSON data:", error));
    
    function populateSelect(selectId, items) {
        const select = document.getElementById(selectId);
        select.innerHTML = `<option value="">${select.options[0]?.text || 'Select'}</option>`;
        items.forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    }
});

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

document.getElementById('sort-developer').addEventListener('change', (e) => {
    selectedDeveloper = e.target.value;
    currentPage = 1;
    renderGames();
});

document.getElementById('sort-publisher').addEventListener('change', (e) => {
    selectedPublisher = e.target.value;
    currentPage = 1;
    renderGames();
});

document.getElementById('sort-rating').addEventListener('change', (e) => {
    selectedRating = e.target.value;
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