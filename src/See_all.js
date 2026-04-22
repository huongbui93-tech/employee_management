function seeAll() {
    if (!window.dataLoaded) {
        alert("Data chưa load xong");
        return;
    }

    // reset UI
    document.getElementById("searchInput").value = "";

    const filterToggle = document.getElementById("filterPositionToggle");
    const positionContainer = document.getElementById("positionFilter");

    if (filterToggle) filterToggle.checked = false;
    if (positionContainer) positionContainer.style.display = "none";

    // 🔥 QUAN TRỌNG: gọi lại search()
    search();
}