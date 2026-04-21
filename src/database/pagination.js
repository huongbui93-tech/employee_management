function renderPagination() {
    const totalPages = Math.ceil(filtered.length / 10);
    let html = "";

    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goPage(${i})">${i}</button>`;
    }

    document.getElementById("pagination").innerHTML = html;
}

window.goPage = function (p) {
    currentPage = p;
    render();
}