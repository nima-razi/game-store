function setupPagination(totalGames) {
    const totalPages = Math.ceil(totalGames / gamesPerPage);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const prevClass = currentPage === 1 ? 'disabled' : '';
    const nextClass = currentPage === totalPages ? 'disabled' : '';

    pagination.innerHTML += `
        <li class="page-item ${prevClass}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        const active = i === currentPage ? 'active' : '';
        pagination.innerHTML += `
            <li class="page-item ${active}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${nextClass}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
    `;

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetPage = parseInt(e.target.dataset.page);
            if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
                currentPage = targetPage;
                renderGames();
                setupPagination(totalGames);
            }
        });
    });
}

fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
        gamesData = data;
        renderGames();
        setupPagination(gamesData.length);
    });