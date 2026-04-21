function renderPagination() {
    const totalPages = Math.ceil(filtered.length / 10);
    let html = "";
    html += `<button onclick="goPrev()" ${currentPage === 1 ? "disabled" : ""}>Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
        html +=  `
            <button onclick="goPage(${i})" 
                style="${i === currentPage ? 'font-weight:bold' : ''}">
                ${i}
            </button>
        `;
    }
    html += `<button onclick="goNext()" ${currentPage === totalPages ? "disabled" : ""}>Next</button>`;
    document.getElementById("pagination").innerHTML = html;
}

window.goPage = function (p) {
    currentPage = p;
    render();
}
window.goPrev = function () {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
}

window.goNext = function () {
    const totalPages = Math.ceil(filtered.length / 10);
    if (currentPage < totalPages) {
        currentPage++;
        render();
    }
}