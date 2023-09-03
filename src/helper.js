//! faker time waiter
export function fakeTimeWaiter() {
  return new Promise((res) => setTimeout(res, Math.random() * 3000));
}

// generate random color
function generateRandomColor() {
  const R = Math.floor(Math.random() * 256); //between 0 and 255
  const G = Math.floor(Math.random() * 256); //between 0 and 255
  const B = Math.floor(Math.random() * 256); //between 0 and 255

  const random_color = `#${R.toString(16).padStart(2, "0")}${G.toString(
    16
  ).padStart(2, "0")}${B.toString(16).padStart(2, "0")}`;
  return random_color;
}

// add new data
export function addBudgetData({ name, amount }) {
  const newBudget = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };
  const existingBudget = fetchLocalData("budget") ?? [];
  return localStorage.setItem(
    "budget",
    JSON.stringify([...existingBudget, newBudget])
  );
}

// add new expense
export function addExpenseData({ name, amount, budgetID }) {
  const newExpense = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    budgetID,
  };
  const existingExpense = fetchLocalData("expense") ?? [];
  return localStorage.setItem(
    "expense",
    JSON.stringify([...existingExpense, newExpense])
  );
}

// get all matching data for budget with expenses

export function getAllMatchingBudget({ type, key, value }) {
  const data = fetchLocalData(type) ?? [];
  return data.filter((item) => item[key] === value);
}

// fetch data
export function fetchLocalData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// delete item
export function deleteData({ type, deleteID }) {
  const data = fetchLocalData(type) ?? [];
  const newData = data.filter((data) => data.id !== deleteID);
  return localStorage.setItem(type, JSON.stringify(newData));
}

// delete item
export function deleteItem({ key }) {
  return localStorage.removeItem(key);
}

// total spent
export function calculateTotalSpent(budgetID) {
  const expenses = fetchLocalData("expense") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (budgetID == expense.budgetID) {
      return acc + expense.amount;
    }

    return acc;
  }, 0);
  return budgetSpent;
}

// Format currency

export function formatCurrency(amount) {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

// Format progress bar

export function formatProgressBar(amount) {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
}

// Format data

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
