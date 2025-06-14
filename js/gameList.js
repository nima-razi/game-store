const gamesPerPage = 12;
let currentPage = 1;
let gamesData = [];

function renderGames() {
    const container = document.getElementById('game-list');
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const currentGames = gamesData.slice(startIndex, endIndex);

    currentGames.forEach(game => {
        const platformBadges = Array.isArray(game.platforms)
            ? game.platforms.map(p => `<span class="badge bg-secondary">${p}</span>`).join(' ')
            : `<span class="badge bg-secondary">${game.platforms}</span>`;

        const html = `
            <div class="col-6 col-xl-2 col-lg-3 col-md-4 mb-4">
                <div class="card h-100 shadow">
                    <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><a href="videogames.html?id=${game.id}">${game.title}</a></h5>
                        <h3><strong>${game.price}</strong></h3>
                        <div class="mt-auto d-flex flex-wrap gap-1">${platformBadges}</div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}