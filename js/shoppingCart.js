document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.selectedQuantity || 1), 0);
    updateCartCount(total);
});

function renderCart() {
    const cartContainer = document.getElementById('shopping-cart'); 
    const totalElement = document.getElementById('cart-total-price');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<li class="list-group-item text-center py-5"><h3>Your cart is empty</h3></li>';
        if(totalElement) totalElement.innerText = "0€";
        updateCartCount(0);
        return;
    }

    cartItems.forEach((item, index) => {
        // Calculate price: remove the '€' and multiply by quantity
        const priceValue = parseFloat(item.price.replace('€', ''));
        totalPrice += priceValue * (item.selectedQuantity || 1);

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center p-3';
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover;" class="rounded me-3">
                <div>
                    <h5 class="mb-0">${item.title}</h5>
                    <p class="text-muted mb-0">${item.selectedPlatform} | Qty: ${item.selectedQuantity}</p>
                </div>
            </div>
            <div class="text-end">
                <div class="fw-bold mb-2">${item.price}</div>
                <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(listItem);
    });

    if(totalElement) totalElement.innerText = totalPrice + "€";
    updateCartCount(cartItems.length);
}

function updateCartCount(count) {
    const counterElement = document.getElementById('cart-count-badge');
    if (counterElement) {
        if (count > 0) {
            counterElement.innerText = count;
            counterElement.classList.remove('d-none');
        } else {
            counterElement.classList.add('d-none');
        }
    }
}

function refreshBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // This sums up the quantities of all items
    const totalItems = cart.reduce((sum, item) => sum + (Number(item.selectedQuantity) || 1), 0);
    updateCartCount(totalItems);
}

document.addEventListener('DOMContentLoaded', () => {
    refreshBadge(); 
    
    // CRITICAL: Call renderCart so the items actually show up!
    if (document.getElementById('shopping-cart')) { 
        renderCart(); 
    }
});

// Function to remove an item
window.removeItem = function(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1); // Remove item at the specific index
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart(); // Refresh the view
};