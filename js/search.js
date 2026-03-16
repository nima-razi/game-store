let gameData = [];

// This function is called by script.js ONLY after nav.html is injected
async function initSearch() {
    const searchInput = document.getElementById('mySearch');
    const suggestions = document.getElementById('suggestions');

    // Safety check: if these aren't on the page, don't run the rest
    if (!searchInput || !suggestions) return;

    try {
        const res = await fetch('data/games.json');
        gameData = await res.json();
    } catch (e) {
        console.error('Failed to load game data:', e);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = '';
        if (!query) return;

        const matches = gameData.filter(game =>
            [game.title, game.description, game.developer, game.publisher, ...(game.platforms || [])]
                .join(' ')
                .toLowerCase()
                .includes(query)
        ).slice(0, 5);

        matches.forEach(game => {
            const item = document.createElement('li');
            item.className = 'list-group-item list-group-item-action';
            item.textContent = game.title;
            item.addEventListener('click', () => {
                searchInput.value = game.title;
                suggestions.innerHTML = '';
                myFunction();
            });
            suggestions.appendChild(item);
        });
    });

    document.addEventListener('click', (e) => {
        if (!suggestions.contains(e.target) && e.target !== searchInput) {
            suggestions.innerHTML = '';
        }
    });
}

// Redirect to results page
function myFunction() {
    const searchInput = document.getElementById('mySearch');
    if (!searchInput) return;
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
        window.location.href = `search-results.html?query=${encodeURIComponent(searchQuery)}`;
    }
}

// Separate logic for the Search Results Page
async function displayResults() {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return; 

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = (urlParams.get('query') || '').toLowerCase();

    try {
        const response = await fetch('data/games.json');
        const data = await response.json();

        const results = data.filter(game =>
            [game.title, game.description, game.developer, game.publisher, ...(game.platforms || [])]
                .join(' ')
                .toLowerCase()
                .includes(searchQuery)
        );

        resultsContainer.innerHTML = '';

        if (results.length > 0) {
            results.forEach(game => {
                const item = document.createElement('div');
                item.classList.add('list-group-item');
                item.innerHTML = `
                    <h5>${game.title}</h5>
                    <p>${game.description}</p>
                    <small>Platforms: ${game.platforms.join(', ')}</small>
                `;
                resultsContainer.appendChild(item);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error loading data.</p>';
        console.error(error);
    }
}

// Still run displayResults on load (for the search-results.html page)
document.addEventListener('DOMContentLoaded', displayResults);