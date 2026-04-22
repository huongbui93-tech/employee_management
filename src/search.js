// ================= INIT =================

const searchInput = document.getElementById("searchInput");
const filterToggle = document.getElementById("filterPositionToggle");
const positionContainer = document.getElementById("positionFilters");

// ================= RENDER POSITION CHECKBOX =================

function renderPositionFilters() {
    if (!positions || positions.length === 0) return;

    positionContainer.innerHTML = positions.map(p => `
        <label style="margin-right:10px;">
            <input type="checkbox" class="positionCheck" value="${p.name}">
            ${p.name}
        </label>
    `).join("");
}

// ================= SEARCH LOGIC =================

function search() {
    const keyword = searchInput.value.toLowerCase().trim();

    // lấy các position đang chọn
    const selectedPositions = [...document.querySelectorAll(".positionCheck:checked")]
        .map(cb => cb.value);
    if (
        !keyword &&
        (
            !filterToggle ||
            !filterToggle.checked ||
            selectedPositions.length === 0
        )
    ) {
        joinData();
        currentPage = 1;
        render();
        return;
    }
    filtered = employees
        .map(emp => {
            let ep = employeePositions.find(e => e.employeeId === emp.id);
            let pos = positions.find(p => p.id === ep?.positionId);

            return {
                ...emp,
                positionName: pos?.name || "",
                startDate: ep?.startDate || "",
                endDate: ep?.endDate || ""
            };
        })
        .filter(e => {
            // ===== filter keyword =====
            const matchKeyword =
                String(e.id).includes(keyword) ||
                e.name.toLowerCase().includes(keyword) ||
                String(e.birthYear).includes(keyword) ||
                e.province.toLowerCase().includes(keyword) ||
                e.city.toLowerCase().includes(keyword) ||
                String(e.account_no).includes(keyword) ||
                e.positionName.toLowerCase().includes(keyword);

            // ===== filter position =====
            let matchPosition = true;

            if (filterToggle.checked && selectedPositions.length > 0) {
                matchPosition = selectedPositions.includes(e.positionName);
            }

            return matchKeyword && matchPosition;
        });

    currentPage = 1; // reset về trang 1
    render();
}

// ================= EVENTS =================

// search khi gõ
searchInput.addEventListener("input", search);

// bật/tắt filter position
filterToggle.addEventListener("change", function () {
    if (this.checked) {
        positionContainer.style.display = "block";
        renderPositionFilters();
    } else {
        positionContainer.style.display = "none";
    }

    search();
});

// chọn position
document.addEventListener("change", function (e) {
    if (e.target.classList.contains("positionCheck")) {
        search();
    }
});

if (searchInput) {
    searchInput.addEventListener("input", search);
}

if (filterToggle) {
    filterToggle.addEventListener("change", function () {
        if (this.checked) {
            positionContainer.style.display = "block";
            renderPositionFilters();
        } else {
            positionContainer.style.display = "none";
        }
        search();
    });
}