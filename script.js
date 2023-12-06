function addExpense() {
    const expense = document.getElementById('expense').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (expense !== '') {
      const expenseItem = { expense, description, category };
      addToLocalStorage(expenseItem);
      displayExpenses();
    } else {
      alert('Please enter an expense amount.');
    }
  }

  // Function to add expense to local storage
  function addToLocalStorage(expenseItem) {
    let expenses = [];
    if (localStorage.getItem('expenses')) {
      expenses = JSON.parse(localStorage.getItem('expenses'));
    }
    expenses.push(expenseItem);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // Function to display expenses
  function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    let expenses = [];
    if (localStorage.getItem('expenses')) {
      expenses = JSON.parse(localStorage.getItem('expenses'));
    }
    expenses.forEach((expense, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
        Expense: ${expense.expense} - Description: ${expense.description} - Category: ${expense.category}
        <button type="button" class="btn btn-danger btn-sm float-right" onclick="deleteExpense(${index})">Delete</button>
        <button type="button" class="btn btn-secondary btn-sm float-right mr-2" onclick="editExpense(${index})">Edit</button>
      `;
      expenseList.appendChild(listItem);
    });
  }

  // Function to delete expense
  function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
  }

  // Function to edit expense
  function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    const editedExpense = expenses[index];
    const newExpense = prompt('Enter new expense amount:', editedExpense.expense);
    if (newExpense !== null) {
      editedExpense.expense = newExpense;
      localStorage.setItem('expenses', JSON.stringify(expenses));
      displayExpenses();
    }
  }

  // Display existing expenses on page load
  displayExpenses();