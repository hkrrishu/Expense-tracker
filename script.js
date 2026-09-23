const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const amount = document.getElementById("expenseAmount").value;
  const description = document.getElementById("expenseDescription").value;
  const category = document.getElementById("expenseCategory").value;

  const expenseList = document.getElementById("expenseList");

  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${amount}</Td>
   <td>${description} </Td> 
    <td>${category}</Td>
      <td><button class="btn btn-danger btn-sm delete-btn">Delete</button>
       <button class="btn btn-warning btn-sm edit-btn">Edit
    </button>
    </td>`;

  const deleteButton = row.querySelector(".delete-btn");

  deleteButton.addEventListener("click", function () {
    row.remove();
  });

  const editButton = row.querySelector(".edit-btn");

  editButton.addEventListener("click", function () {
    document.getElementById("expenseAmount").value = amount;

    document.getElementById("expenseDescription").value = description;

    document.getElementById("expenseCategory").value = category;
  });

  expenseList.appendChild(row);
});
