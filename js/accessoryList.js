const accessoriesPerPage = 12;
let currentPage = 1;
let accessoriesData = [];

function renderAccessorys() {
    const container = document.getElementById('accessories-list');
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * accessoriesPerPage;
    const endIndex = startIndex + accessoriesPerPage;
    const currentAccessories = accessoriesData.slice(startIndex, endIndex);

    currentAccessories.forEach(accessory => {
        const platformBadges = Array.isArray(accessory.platforms)
            ? accessory.platforms.map(p => `<span class="badge bg-secondary">${p}</span>`).join(' ')
            : `<span class="badge bg-secondary">${accessory.platforms}</span>`;

        const html = `
            <div class="col-6 col-xl-2 col-lg-3 col-md-4 mb-4">
                <div class="card h-100 shadow">
                    <img src="${accessory.image}" class="card-img-top" alt="${accessory.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><a href="accessoryView.html?id=${accessory.id}">${accessory.title}</a></h5>
                        <h3><strong>${accessory.price}</strong></h3>
                        <div class="mt-auto d-flex flex-wrap gap-1">${platformBadges}</div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}