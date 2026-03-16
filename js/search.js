let gameData = [];

// This function is called by script.js ONLY after nav.html is injected
async function initSearch() {
    const searchInput = document.getElementById('mySearch');
    const suggestions = document.getElementById('suggestions');

    if (!searchInput || !suggestions) return;

    try {
        const res = await fetch('data/games.json');
        gameData = await res.json();
    } catch (e) {
        console.error('Failed to load game data:', e);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = ''; // Clear previous suggestions
        
        if (!query) return;

        const matches = gameData.filter(game => {
            const searchFields = [
                game.title,
                game.developer,
                game.publisher,
                game.genre,
                game.description,
                ...(game.platforms || [])
            ];
            return searchFields.join(' ').toLowerCase().includes(query);
        }).slice(0, 5); // Limit to top 5 for the dropdown

        // --- THE MISSING PART: Creating the dropdown items ---
        matches.forEach(game => {
            const item = document.createElement('li');
            item.className = 'list-group-item list-group-item-action';
            
            // Show title and a small hint of the genre/developer
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <span>${game.title}</span>
                    <small class="text-muted" style="font-size: 0.75rem;">${game.genre}</small>
                </div>
            `;

            item.addEventListener('click', () => {
                searchInput.value = game.title;
                suggestions.innerHTML = '';
                // Optional: go straight to game-view instead of the search results page
                window.location.href = `game-view.html?id=${game.id}`;
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

        const results = data.filter(game => {
    return [
        game.title,
        game.developer,
        game.publisher,
        game.genre,
        game.description,
        ...(game.platforms || [])
    ].join(' ').toLowerCase().includes(searchQuery);
});

        resultsContainer.innerHTML = '';

        if (results.length > 0) {
            results.forEach(game => {
                const item = document.createElement('div');
                item.classList.add('list-group-item', 'p-3');
                
                // We create a row to hold the image and the info side-by-side
                item.innerHTML = `
    <div class="row align-items-center">
        <div class="col-3 col-md-2">
            <img src="${game.image}" class="img-fluid rounded shadow-sm" alt="${game.title}">
        </div>
        <div class="col-9 col-md-10">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="mb-1">${game.title}</h5>
                    <p class="mb-1">
                        <span class="badge bg-info text-dark">${game.genre}</span>
                        <small class="text-muted ms-2">Dev: ${game.developer}</small>
                    </p>
                    <p class="mb-1 text-muted small text-truncate" style="max-width: 400px;">
                        ${game.description}
                    </p>
                </div>
                <a href="game-view.html?id=${game.id}" class="btn btn-outline-primary btn-sm">
                    View Game
                </a>
            </div>
        </div>
    </div>
`;
                resultsContainer.appendChild(item);
            });
        } else {
            resultsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                    <p class="mt-3">No results found for "${searchQuery}"</p>
                    <a href="videogames.html" class="btn btn-primary">Browse All Games</a>
                </div>`;
        }
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error loading data.</p>';
        console.error(error);
    }
}

// Still run displayResults on load (for the search-results.html page)
document.addEventListener('DOMContentLoaded', displayResults);