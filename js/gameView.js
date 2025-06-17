// Get the ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

// Fetch the game data
fetch('data/games.json')
    .then(res => res.json())
    .then(games => {
        const game = games.find(g => g.id == gameId);
        if (!game) {
            document.getElementById('game-details').innerHTML = `<p class="text-danger">Game not found.</p>`;
            return;
        }

        // Build platform options
        const platformOptions = game.platforms.map(p => `<option>${p}</option>`).join('');

        // Insert dynamic content
        document.getElementById('game-details').innerHTML = `
            <div class="row justify-content-center align-items-center">
                <div class="col-6 col-md-4">
                    <img class="d-block w-100" src="${game.image}" alt="${game.title}">
                </div>
                <div class="col-10 col-md-4 py-2">
                    <h2>${game.title}</h2>
                    <h1><strong>${game.price}</strong></h1>
                    <form class="row">
                        <div class="col-12 mb-3">
                            <input class="form-control" min="0" type="number" name="qty" id="qty" placeholder="Select Qty">
                        </div>
                        <div class="col-12 mb-3">
                            <select class="form-select" aria-label="Select Platform">
                                <option selected>Select Platform</option>
                                ${platformOptions}
                            </select>
                        </div>
                        <div class="col-auto mb-3">
                            <button type="button" class="btn btn-primary">Add to Cart</button>
                        </div>
                    </form> 
                </div>
                <div class="col-10 col-md-8 py-2">
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    Information
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-12 col-lg-6 mb-3"><strong>Release Year:</strong> ${game.release_year}</div>
                                        <div class="col-12 col-lg-6 mb-3"><strong>Age Rate:</strong> ${game.rating}</div>
                                        <div class="col-12 col-lg-6 mb-3"><strong>Developer:</strong> ${game.developer}</div>
                                        <div class="col-12 col-lg-6 mb-3"><strong>Publisher:</strong> ${game.publisher}</div>
                                        <div class="col-12 col-lg-6 mb-3"><strong>Genre:</strong> ${game.genre}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                    Description
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    ${game.description}
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        `;
    });