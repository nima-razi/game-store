const modal = new bootstrap.Modal(document.getElementById('addGameModal'));
modal.show();

document.getElementById('videoGameForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }
    
    const newGame = {
        title: document.getElementById('productName').value,
        developer: document.getElementById('developer').value,
        publisher: document.getElementById('publisher').value,
        rating: document.getElementById('ageRating').value,
        price: document.getElementById('priceInput').value + "€",
        release_year: parseInt(document.getElementById('releaseYear').value),
        description: document.getElementById('description').value,
        image: "assets/images/covers/default.jpg", // Replace with real image logic
        platforms: [document.getElementById('platform').value],
        genre: document.getElementById('genre').value,
        id: Date.now(), // unique ID
        url: document.getElementById('productUrl').value
    };

    const response = await fetch('http://localhost:3000/add-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame)
    });

    if (response.ok) {
        alert('Game added successfully!');
        document.getElementById('videoGameForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('addGameModal')).hide();
    } else {
        alert('Failed to add game.');
    }
});