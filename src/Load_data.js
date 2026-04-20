let employees = [];
let positions = [];
let employeePositions = [];

let filtered = [];
let currentPage = 1;
let selectedIds = [];

async function loadData() {
    employees = await fetch("src/database/employee.json").then(r => r.json());
    positions = await fetch("src/database/positions.json").then(r => r.json());
    employeePositions = await fetch("src/database/employee_positions.json").then(r => r.json());

    joinData();

    window.dataLoaded = true; // đánh dấu đã load xong
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
    const tbody = document.getElementById("tableBody");

    tbody.innerHTML = filtered.map(e => `
        <tr>
            <td></td>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.birthYear}</td>
            <td>${e.province},${e.city}</td>
            <td>${e.account_no}</td>
            <td>${e.positionName}</td>
            <td>${e.startDate}</td>
            <td>${e.endDate || "Đang làm"}</td>
        </tr>
    `).join("");
}