import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const API = "http://localhost:5000";

  const fetchExpenses = async () => {
  try {
    const res = await axios.get(`${API}/expenses`);
    setExpenses(res.data);
  } catch (err) {
    console.error("Error fetching expenses:", err);
  }
};

 const fetchTotal = async () => {
  try {
    const res = await axios.get(`${API}/total`);
    setTotal(res.data.total);
  } catch (err) {
    console.error("Error fetching total:", err);
  }
};
  const addExpense = async () => {
  if (!amount || !category) return;

  try {
    await axios.post(`${API}/add-expense`, {
      amount: parseFloat(amount), // ensure number
      category,
      note,
    });

    setAmount("");
    setCategory("");
    setNote("");

    fetchExpenses();
    fetchTotal();
  } catch (err) {
    console.error("Error adding expense:", err);
  }
}; 

  useEffect(() => {
    fetchExpenses();
    fetchTotal();
  }, []);

  return (
  <div style={{
    maxWidth: 420,
    margin: "40px auto",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
    fontFamily: "Arial"
  }}>
    <h2 style={{ textAlign: "center" }}>TrackWise 💰</h2>

    <input placeholder="Amount" value={amount}
      onChange={e => setAmount(e.target.value)} />

    <input placeholder="Category" value={category}
      onChange={e => setCategory(e.target.value)} />

    <input placeholder="Note" value={note}
      onChange={e => setNote(e.target.value)} />

    <button onClick={addExpense}>Add Expense</button>

    <h3>Total: ₹{total}</h3>

    <ul>
      {expenses.map(e => (
        <li key={e.id}>
  ₹{e.amount} • {e.category}
  <button onClick={async () => {
    await axios.delete(`${API}/delete/${e.id}`);
    fetchExpenses();
    fetchTotal();
  }}>❌</button>
</li>
      ))}
    </ul>
  </div>
);
}

export default App;