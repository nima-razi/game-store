$(function(){
    $("#nav").load("nav.html");
    $("#footer").load("footer.html"); 
});
// Search button function
function myFunction() { 
    const searchQuery = document.getElementById('mySearch').value.toLowerCase();
    const links = document.querySelectorAll('a');
    let results = [];

    links.forEach(link => {
        if (link.textContent.toLowerCase().includes(searchQuery)) {
            results.push({ href: link.href, text: link.textContent });
        }
    });

    if (results.length > 0) {
        // Store results in local storage
        localStorage.setItem('searchResults', JSON.stringify(results));
        window.location.href = `search-results.html?query=${encodeURIComponent(searchQuery)}`;
    } else {
        alert('No results found.');
    }
}
// Search results display
function displayResults() {
    const results = JSON.parse(localStorage.getItem('searchResults'));
    const resultsContainer = document.getElementById('searchResults');

    if (results && results.length > 0) {
        results.forEach(result => {
            const linkElement = document.createElement('a');
            linkElement.href = result.href;
            linkElement.textContent = result.text;
            linkElement.classList.add('list-group-item', 'list-group-item-action');
            resultsContainer.appendChild(linkElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}
document.addEventListener('DOMContentLoaded', displayResults);