function seeAll() {
    if (!window.dataLoaded) {
        alert("Data chưa load xong");
        return;
    }

    // ===== 1. Reset UI =====
    document.getElementById("searchInput").value = "";

    const filterToggle = document.getElementById("filterPositionToggle");
    const positionContainer = document.getElementById("positionFilter");

    if (filterToggle) filterToggle.checked = false;
    if (positionContainer) positionContainer.style.display = "none";

    // uncheck tất cả checkbox position (nếu có)
    document.querySelectorAll(".positionCheck").forEach(cb => cb.checked = false);

    // ===== 2. Reset DATA =====
    currentPage = 1;

    // clear selected
    selectedIds = [];
    window.selectedIds = selectedIds;

    // reset filtered = toàn bộ employees (join lại cho chắc)
    joinData();

    // ===== 3. Render lại =====
    render();
}
document.getElementById("seeAllBtn").addEventListener("click", seeAll);