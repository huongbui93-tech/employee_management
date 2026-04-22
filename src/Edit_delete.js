let editingId = null;
let mode = "edit"; // "edit" | "add"

// ================= OPEN EDIT =================
function openEditModal() {
    if (selectedIds.length !== 1) return;

    const id = selectedIds[0];
    const emp = employees.find(e => String(e.id) === id);
    if (!emp) return;

    mode = "edit";
    editingId = id;

    document.getElementById("editName").value = emp.name;
    document.getElementById("editBirthYear").value = emp.birthYear;
    document.getElementById("editProvince").value = emp.province;
    document.getElementById("editCity").value = emp.city;
    document.getElementById("editAccount").value = emp.account_no;

    document.getElementById("editModal").style.display = "block";
}

// ================= OPEN ADD =================
function openAddModal() {
    mode = "add";
    editingId = null;

    // clear form
    document.getElementById("editName").value = "";
    document.getElementById("editBirthYear").value = "";
    document.getElementById("editProvince").value = "";
    document.getElementById("editCity").value = "";
    document.getElementById("editAccount").value = "";

    document.getElementById("editModal").style.display = "block";
}

// ================= CLOSE =================
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// ================= SAVE =================
document.getElementById("saveEdit").addEventListener("click", function () {

    const name = document.getElementById("editName").value;
    const birthYear = document.getElementById("editBirthYear").value;
    const province = document.getElementById("editProvince").value;
    const city = document.getElementById("editCity").value;
    const account = document.getElementById("editAccount").value;

    // check trùng account
    if (employees.some(e => e.account_no == account && String(e.id) !== editingId)) {
        alert("Trùng account!");
        return;
    }

    if (mode === "edit") {
        const emp = employees.find(e => String(e.id) === editingId);
        if (!emp) return;

        emp.name = name;
        emp.birthYear = birthYear;
        emp.province = province;
        emp.city = city;
        emp.account_no = account;
    }

    if (mode === "add") {
        // 🔥 tạo id mới
        const maxId = Math.max(...employees.map(e => e.id));
        const newId = maxId + 1;

        const newEmp = {
            id: newId,
            name,
            birthYear,
            province,
            city,
            account_no: account
        };

        employees.push(newEmp);
    }

    closeModal();
    search(); // 🔥 luôn dùng search để render
});

// ================= DELETE =================
function deleteSelected() {
    if (selectedIds.length === 0) return;

    if (!confirm("Bạn có chắc muốn xóa không?")) return;

    employees = employees.filter(e => !selectedIds.includes(String(e.id)));

    selectedIds = [];
    window.selectedIds = selectedIds;
    window.employees = employees;

    search();
}

// ================= BIND =================
document.getElementById("editBtn").addEventListener("click", openEditModal);
document.getElementById("deleteBtn").addEventListener("click", deleteSelected);

// expose cho HTML
window.openAddModal = openAddModal;
window.closeModal = closeModal;