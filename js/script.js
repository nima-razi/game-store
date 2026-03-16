document.addEventListener('DOMContentLoaded', () => {
    fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        const navbar = document.getElementById('nav');
        if (navbar) {
            navbar.innerHTML = data;
            if (typeof refreshBadge === 'function') {
                refreshBadge();
            }
            if (typeof initSearch === 'function') {
                initSearch();
            }
            if (typeof updateCartBadge === 'function') {
                updateCartBadge();
            }
            const searchForm = navbar.querySelector('form[role="search"]');
            if (searchForm) {
                searchForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    myFunction();
                });
            }
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            navbar.querySelectorAll('.nav-link').forEach(link => {
                const linkPath = link.getAttribute('href');
                link.classList.toggle('active', linkPath === currentPath);
            });
        }
    });
    
    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const footer = document.getElementById('footer');
        if (footer) footer.innerHTML = data;
    });
});