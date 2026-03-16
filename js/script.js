document.addEventListener('DOMContentLoaded', () => {
    // Load nav.html
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const navbar = document.getElementById('nav');
            if (navbar) {
                navbar.innerHTML = data;

                if (typeof refreshBadge === 'function') {
                    refreshBadge();
                }

                // 1. Wake up the search logic now that the elements exist
                if (typeof initSearch === 'function') {
                    initSearch();
                }

                // 2. Wake up the cart badge logic
                if (typeof updateCartBadge === 'function') {
                    updateCartBadge();
                }

                // Attach search form handler manually
                const searchForm = navbar.querySelector('form[role="search"]');
                if (searchForm) {
                    searchForm.addEventListener('submit', (event) => {
                        event.preventDefault();
                        myFunction();
                    });
                }

                // Highlight active nav link
                const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                navbar.querySelectorAll('.nav-link').forEach(link => {
                    const linkPath = link.getAttribute('href');
                    link.classList.toggle('active', linkPath === currentPath);
                });
            }
        });

    // Load footer.html
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) footer.innerHTML = data;
        });
});