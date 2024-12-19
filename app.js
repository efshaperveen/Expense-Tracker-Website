// // DOM elements
// const expenseForm = document.getElementById('expense-form');
// const expenseNameInput = document.getElementById('expense-name');
// const expenseAmountInput = document.getElementById('expense-amount');
// const expenseDateInput = document.getElementById('expense-date');
// const expenseList = document.getElementById('expense-list');
// const totalExpenseDisplay = document.getElementById('total-expense');

// // Expenses array to store data
// let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// // Event listener for form submission
// expenseForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     const name = expenseNameInput.value;
//     const amount = parseFloat(expenseAmountInput.value);
//     const date = expenseDateInput.value;

//     // Create a new expense object
//     const expense = { id: Date.now(), name, amount, date };

//     // Add expense to array and localStorage
//     expenses.push(expense);
//     localStorage.setItem('expenses', JSON.stringify(expenses));

//     // Reset form inputs
//     expenseNameInput.value = '';
//     expenseAmountInput.value = '';
//     expenseDateInput.value = '';

//     // Update UI
//     displayExpenses();
//     calculateTotal();
// });

// // Function to display expenses in the table
// function displayExpenses() {
//     expenseList.innerHTML = ''; // Clear existing list

//     expenses.forEach(expense => {
//         const row = document.createElement('tr');

//         row.innerHTML = `
//             <td>${expense.name}</td>
//             <td>$${expense.amount.toFixed(2)}</td>
//             <td>${expense.date}</td>
//             <td><button onclick="deleteExpense(${expense.id})">Delete</button></td>
//         `;

//         expenseList.appendChild(row);
//     });
// }

// // Function to calculate total expense
// function calculateTotal() {
//     const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//     totalExpenseDisplay.textContent = total.toFixed(2);
// }

// // Function to delete an expense
// function deleteExpense(id) {
//     expenses = expenses.filter(expense => expense.id !== id);
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//     displayExpenses();
//     calculateTotal();
// }

// // Initialize app
// displayExpenses();
// calculateTotal();








// Select Elements
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseDateInput = document.getElementById("expense-date");
const expenseList = document.getElementById("expense-list");
const totalExpenseDisplay = document.getElementById("total-expense");

// Expense Data
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Chart.js Initialization
let expenseChart;
const ctx = document.getElementById("expense-chart").getContext("2d");

// Update Chart Function
function updateChart() {
    const names = expenses.map(exp => exp.name);
    const amounts = expenses.map(exp => exp.amount);

    if (expenseChart) {
        expenseChart.destroy(); // Destroy existing chart before updating
    }

    expenseChart = new Chart(ctx, {
        type: "pie", // Change to 'bar' for bar graph
        data: {
            labels: names,
            datasets: [{
                label: "Expense Distribution",
                data: amounts,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Add Expense Function
function addExpense(event) {
    event.preventDefault();

    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const date = expenseDateInput.value;

    if (name && amount && date) {
        const newExpense = { name, amount, date };
        expenses.push(newExpense);

        // Save to Local Storage
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // Update DOM
        renderExpenses();
        updateChart();
        updateTotal();

        // Reset Form
        expenseForm.reset();
    }
}

// Render Expenses in Table
function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((exp, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${exp.name}</td>
            <td>$${exp.amount.toFixed(2)}</td>
            <td>${exp.date}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });
}

// Update Total Expense
function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpenseDisplay.textContent = total.toFixed(2);
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);

    // Update Local Storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    updateChart();
    updateTotal();
}

// Load Data from Local Storage on Page Load
function loadExpenses() {
    renderExpenses();
    updateChart();
    updateTotal();
}

// Event Listener
expenseForm.addEventListener("submit", addExpense);

// Initial Load
loadExpenses();
