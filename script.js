const expenseForm = document.getElementById("expenseForm");
let editingRow = null;
let editingIndex = -1;
let expenses = [];

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const amount = document.getElementById("expenseAmount").value;
  const description = document.getElementById("expenseDescription").value;
  const category = document.getElementById("expenseCategory").value;

  //   deleting the previous row and updating the new row
  if (editingRow !== null) {
    editingRow.cells[0].textContent = amount;
    editingRow.cells[1].textContent = description;
    editingRow.cells[2].textContent = category;

    expenses[editingIndex] = { amount, description, category };
    localStorage.setItem("expenses", JSON.stringify(expenses));

    editingRow = null;
    expenseForm.reset();

    return;
  }
  //   adding to local storage

  expenses.push({ amount, description, category });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  const expenseList = document.getElementById("expenseList");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${amount}</Td>
    <td>${description} </Td> 
    <td>${category}</Td>
    <td>
    <button class="btn btn-danger btn-sm delete-btn">
        Delete
    </button>
    <button class="btn btn-warning btn-sm edit-btn">
        Edit
    </button>
    </td>`;

  // delete

  const deleteButton = row.querySelector(".delete-btn");

  deleteButton.addEventListener("click", function () {
    // finding the index of expense to delete from the expenses array
    const index = expenses.findIndex(function (expense) {
      const currentAmount = row.cells[0].textContent;
      const currentDescription = row.cells[1].textContent;
      const currentCategory = row.cells[2].textContent;
      return (
        expense.amount === currentAmount &&
        expense.description === currentDescription &&
        expense.category === currentCategory
      );
    });
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    row.remove();
  });

  // edit
  const editButton = row.querySelector(".edit-btn");

  editButton.addEventListener("click", function () {
    editingRow = row;

    editingIndex = expenses.findIndex(function (expense) {
      return (
        expense.amount === amount &&
        expense.description === description &&
        expense.category === category
      );
    });
    document.getElementById("expenseAmount").value = amount;

    document.getElementById("expenseDescription").value = description;

    document.getElementById("expenseCategory").value = category;
  });

  expenseList.appendChild(row);
  expenseForm.reset();
});
