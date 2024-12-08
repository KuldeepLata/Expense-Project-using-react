import React, { useState } from 'react';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editing, setEditing] = useState(null);

  // Add or Update Expense
  const addExpense = () => {
    if (!name || !amount || !category || isNaN(amount)) {
      alert('Please enter valid expense details.');
      return;
    }

    const newExpense = {
      id: editing ? editing.id : Date.now(),
      name,
      amount: parseFloat(amount),
      category,
    };

    if (editing) {
      // Update expense
      setExpenses(expenses.map((expense) => (expense.id === editing.id ? newExpense : expense)));
      setEditing(null);
    } else {
      // Add new expense
      setExpenses([...expenses, newExpense]);
    }

    // Clear form
    setName('');
    setAmount('');
    setCategory('');
  };

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Start editing an expense
  const editExpense = (expense) => {
    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);
    setEditing(expense);
  };

  // Calculate Total Expenses by Category
  const totalByCategory = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const categories = [...new Set(expenses.map((expense) => expense.category))];

  return (
    <div style={styles.container}>
      <h1>Expense Tracker</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
        <button onClick={addExpense} style={styles.button}>
          {editing ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>

      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul style={styles.list}>
          {expenses.map((expense) => (
            <li key={expense.id} style={styles.item}>
              {expense.name}: ₹{expense.amount.toFixed(2)} (Category: {expense.category})
              <button onClick={() => editExpense(expense)} style={styles.edit}>
                Edit
              </button>
              <button onClick={() => deleteExpense(expense.id)} style={styles.delete}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total Expenses: ₹{expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</h3>

      <h3>Expenses by Category:</h3>
      {categories.map((category) => (
        <p key={category}>
          {category}: ₹{totalByCategory(category).toFixed(2)}
        </p>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    marginBottom: '10px',
  },
  edit: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  delete: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default App;
