console.log("JS loaded");
function seeAll() {
    if (!window.dataLoaded) {
        alert("Data chưa load xong");
        return;
    }

    filtered = [...filtered].sort((a, b) => b.id - a.id);
    currentPage = 1;
    render();
}

document.getElementById("seeAllBtn").addEventListener("click", seeAll);
