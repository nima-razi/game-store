const gamesPerPage = 12;
let currentPage = 1;
let gamesData = [];

const platformColors = {
    'playstation': 'primary', // blue
    'nintendo': 'danger',     // red
    'xbox': 'success',        // green
    'pc': 'dark'              // dark
};

function getPlatformClass(platform) {
    const lower = platform.toLowerCase();
    if (lower.includes('playstation')) return 'primary';
    if (lower.includes('nintendo') || lower.includes('wii u')) return 'danger';
    if (lower.includes('xbox')) return 'success';
    if (lower.includes('pc')) return 'dark';
    return 'secondary';
}

function parsePrice(priceStr) {
    return parseFloat(priceStr.replace('€', '').replace(',', '.')) || 0;
}

function renderGames() {
    const container = document.getElementById('game-list');
    container.innerHTML = '';

    let gamesToDisplay = sortedGames.length ? sortedGames : gamesData;

    if (selectedPlatform) {
        gamesToDisplay = gamesToDisplay.filter(game => {
            const platforms = Array.isArray(game.platforms) ? game.platforms : [game.platforms];
            return platforms.some(p => p.toLowerCase().includes(selectedPlatform.toLowerCase()));
        });
    }

    if (selectedGenre) {
        gamesToDisplay = gamesToDisplay.filter(game => {
            const genres = Array.isArray(game.genre) ? game.genre : [game.genre];
            return genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase());
        });
    }

    if (selectedDeveloper) {
        gamesToDisplay = gamesToDisplay.filter(game => {
            const developer = Array.isArray(game.developer) ? game.developer : [game.developer];
            return developer.some(g => g.toLowerCase() === selectedDeveloper.toLowerCase());
        });
    }

    if (selectedPublisher) {
        gamesToDisplay = gamesToDisplay.filter(game => {
            const publisher = Array.isArray(game.publisher) ? game.publisher : [game.publisher];
            return publisher.some(g => g.toLowerCase() === selectedPublisher.toLowerCase());
        });
    }

    if (selectedRating) {
        gamesToDisplay = gamesToDisplay.filter(game => {
            const rating = Array.isArray(game.rating) ? game.rating : [game.rating];
            return rating.some(g => g.toLowerCase() === selectedRating.toLowerCase());
        });
    }

    // 🔽 Filter by price range
    gamesToDisplay = gamesToDisplay.filter(game => {
        const price = parsePrice(game.price);
        return price >= minPrice && price <= maxPrice;
    });

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const currentGames = gamesToDisplay.slice(startIndex, endIndex);

    currentGames.forEach(game => {
        const platformBadges = Array.isArray(game.platforms)
    ? game.platforms.map(p => {
        const colorClass = getPlatformClass(p);
        return `<span class="badge bg-${colorClass}">${p}</span>`;
    }).join(' ')
    : `<span class="badge bg-${getPlatformClass(game.platforms)}">${game.platforms}</span>`;

        const html = `
            <div class="col-6 col-xl-2 col-lg-3 col-md-4 mb-4">
                <div class="card h-100 rounded-0">
                    <img src="${game.image}" class="card-img-top rounded-0" alt="${game.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><a class="text-decoration-none stretched-link" href="game-view.html?id=${game.id}">${game.title}</a></h5>
                        <h3><strong>${game.price}</strong></h3>
                        <div class="mt-auto d-flex flex-wrap gap-1">${platformBadges}</div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}