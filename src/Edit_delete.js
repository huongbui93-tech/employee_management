let editingId = null;

// ================= EDIT =================

// mở modal
function openEditModal() {
    if (selectedIds.length !== 1) return;

    const id = selectedIds[0];
    const emp = employees.find(e => String(e.id) === id);

    if (!emp) return;

    editingId = id;

    document.getElementById("editName").value = emp.name;
    document.getElementById("editBirthYear").value = emp.birthYear;
    document.getElementById("editProvince").value = emp.province;
    document.getElementById("editCity").value = emp.city;
    document.getElementById("editAccount").value = emp.account_no;

    document.getElementById("editModal").style.display = "block";
}

// đóng modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// save
document.getElementById("saveEdit").addEventListener("click", function () {
    if (!editingId) return;

    const emp = employees.find(e => String(e.id) === editingId);
    if (!emp) return;

    const newAccount = document.getElementById("editAccount").value;

    // check trùng account
    if (employees.some(e => e.account_no == newAccount && String(e.id) !== editingId)) {
        alert("Trùng account!");
        return;
    }

    // update data
    emp.name = document.getElementById("editName").value;
    emp.birthYear = document.getElementById("editBirthYear").value;
    emp.province = document.getElementById("editProvince").value;
    emp.city = document.getElementById("editCity").value;
    emp.account_no = newAccount;

    closeModal();
    render();
});

// ================= DELETE =================

function deleteSelected() {
    if (selectedIds.length === 0) return;

    if (!confirm("Bạn có chắc muốn xóa không?")) return;

    // chỉ xóa trong employees
    employees = employees.filter(e => !selectedIds.includes(String(e.id)));

    // reset
    selectedIds = [];
    window.selectedIds = selectedIds;
    window.employees = employees;

    render();
}

// ================= BIND BUTTON =================

document.getElementById("editBtn").addEventListener("click", openEditModal);
document.getElementById("deleteBtn").addEventListener("click", deleteSelected);

// expose để HTML gọi được
window.closeModal = closeModal;