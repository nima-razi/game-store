document.addEventListener('DOMContentLoaded', () => {
    // Load nav.html
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const navbar = document.getElementById('nav');
            if (navbar) {
                navbar.innerHTML = data;

                // Attach search form handler manually
                const searchForm = navbar.querySelector('form[role="search"]');
                if (searchForm) {
                    searchForm.addEventListener('submit', (event) => {
                        event.preventDefault();
                        myFunction();
                    });
                }

                // Highlight active nav link
                const currentPath = window.location.pathname.split('/').pop();
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