const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

fetch('data/games.json')
    .then(res => res.json())
    .then(games => {
        const game = games.find(g => g.id == gameId);
        if (!game) {
            document.getElementById('game-details').innerHTML = `<p class="text-danger">Game not found.</p>`;
            return;
        }

        const platformOptions = game.platforms.map(p => `<option value="${p}">${p}</option>`).join('');

        // 1. Added IDs to the <select> and <button> for easy targeting
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
                        <input class="form-control" min="1" value="1" type="number" id="qty" placeholder="Select Qty">
                    </div>
                    <div class="col-12 mb-3">
                        <select class="form-select" id="platform-select">
                            <option value="" selected disabled>Select Platform</option>
                            ${platformOptions}
                        </select>
                    </div>
                    <div class="col-auto mb-3">
                        <button type="button" id="add-to-cart-btn" class="btn btn-primary">Add to Cart</button>
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
                                    <div class="col-12 col-lg-6 mb-3"><strong>Age Rating:</strong> ${game.rating}</div>
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
        </div>`;

        // 2. Attach the event listener AFTER the HTML is injected
        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            addToCart(game);
        });
    });

// 3. The logic to save the item to LocalStorage
function addToCart(game) {
    const qty = parseInt(document.getElementById('qty').value);
    const platform = document.getElementById('platform-select').value;

    // Basic Validation
    if (!platform) {
        alert("Please select a platform!");
        return;
    }
    if (isNaN(qty) || qty < 1) {
        alert("Please enter a valid quantity!");
        return;
    }

    // Create the item object
    const cartItem = {
        ...game, // Spread operator copies all properties from the game JSON
        selectedQuantity: qty,
        selectedPlatform: platform
    };

    // Get current cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Optional: Check if item already exists in cart (same ID and Platform)
    const existingItemIndex = cart.findIndex(item => item.id === game.id && item.selectedPlatform === platform);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].selectedQuantity += qty;
    } else {
        cart.push(cartItem);
    }

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Feedback for the user
    alert(`${game.title} added to cart!`);
}