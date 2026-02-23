import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const API = "https://trackwise-api.onrender.com";

  const fetchExpenses = async () => {
    const res = await axios.get(`${API}/expenses`);
    setExpenses(res.data);
  };

  const fetchTotal = async () => {
    const res = await axios.get(`${API}/total`);
    setTotal(res.data.total);
  };

  const addExpense = async () => {
    if (!amount || !category) return;

    await axios.post(`${API}/add-expense`, {
      amount,
      category,
      note,
    });

    setAmount("");
    setCategory("");
    setNote("");

    fetchExpenses();
    fetchTotal();
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