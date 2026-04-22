let employees = [];
let positions = [];
let employeePositions = [];

let filtered = [];
let currentPage = 1;
let selectedIds = [];

// expose để file khác dùng
window.selectedIds = selectedIds;
window.employees = employees;
window.render = render;

async function loadData() {
    employees = await fetch("src/database/employee.json").then(r => r.json());
    positions = await fetch("src/database/positions.json").then(r => r.json());
    employeePositions = await fetch("src/database/employee_positions.json").then(r => r.json());

    window.employees = employees; // cập nhật lại global

    joinData();
    render();
}

loadData();

function joinData() {
    filtered = employees.map(emp => {
        let ep = employeePositions.find(e => e.employeeId === emp.id);
        let pos = positions.find(p => p.id === ep?.positionId);

        return {
            ...emp,
            positionName: pos?.name || "",
            startDate: ep?.startDate || "",
            endDate: ep?.endDate || ""
        };
    });
}

function render() {
    joinData();
    const tbody = document.getElementById("tableBody");
    const start = (currentPage - 1) * 10;
    const end = start + 10;

    const pageData = filtered.slice(start, end);

    tbody.innerHTML = pageData.map(e => `
        <tr>
            <td>
                <input type="checkbox" class="rowCheck"
                    value="${e.id}"
                    ${selectedIds.includes(String(e.id)) ? "checked" : ""}
                >
            </td>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.birthYear}</td>
            <td>${e.province}, ${e.city}</td>
            <td>${e.account_no}</td>
            <td>${e.positionName}</td>
            <td>${e.startDate}</td>
            <td>${e.endDate || "Đang làm"}</td>
        </tr>
    `).join("");

    updateCheckAllState();
    updateButtons();
    renderPagination();
}

// ================= EVENT =================

// checkbox từng dòng
document.addEventListener("change", function (e) {
    if (e.target.classList.contains("rowCheck")) {
        const id = String(e.target.value);

        if (e.target.checked) {
            if (!selectedIds.includes(id)) selectedIds.push(id);
        } else {
            selectedIds = selectedIds.filter(x => x !== id);
        }

        window.selectedIds = selectedIds;

        updateCheckAllState();
        updateButtons();
    }
});

// checkbox checkAll
document.getElementById("checkAll").addEventListener("change", function () {
    const rowChecks = document.querySelectorAll(".rowCheck");

    rowChecks.forEach(cb => {
        cb.checked = this.checked;

        const id = String(cb.value);

        if (this.checked) {
            if (!selectedIds.includes(id)) selectedIds.push(id);
        } else {
            selectedIds = selectedIds.filter(x => x !== id);
        }
    });

    window.selectedIds = selectedIds;
    updateButtons();
});

// ================= HELPER =================

function updateButtons() {
    document.getElementById("deleteBtn").disabled = selectedIds.length === 0;
    document.getElementById("editBtn").disabled = selectedIds.length !== 1;
}

function updateCheckAllState() {
    const checkAll = document.getElementById("checkAll");
    const rowChecks = document.querySelectorAll(".rowCheck");

    const total = rowChecks.length;
    const checked = [...rowChecks].filter(cb => cb.checked).length;

    if (checked === 0) {
        checkAll.checked = false;
        checkAll.indeterminate = false;
    } else if (checked === total) {
        checkAll.checked = true;
        checkAll.indeterminate = false;
    } else {
        checkAll.checked = false;
        checkAll.indeterminate = true;
    }
}