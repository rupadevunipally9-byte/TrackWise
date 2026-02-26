import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

let generatedOTP = null;

function generateOTP() {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP (simulated):", generatedOTP);
  return generatedOTP;
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [gmail, setGmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (username === "RUPA" && password === "NIKHIL") {
      onLogin();
    } else {
      setError("❌ Invalid username or password. (Case sensitive)");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleForgotEmail = () => {
    if (gmail === "rupadevunipally9@gmail.com") {
      generateOTP();
      setForgotMsg(`✅ OTP sent to ${gmail}`);
      setForgotStep(2);
    } else {
      setForgotMsg("❌ Gmail address not recognized.");
    }
  };

  const handleOTPVerify = () => {
    if (otp === generatedOTP) {
      setForgotStep(3);
      setForgotMsg("");
    } else {
      setForgotMsg("❌ Wrong OTP. Try again.");
    }
  };

  const handlePasswordChange = () => {
    if (newPass.length < 4) {
      setForgotMsg("❌ Password too short.");
      return;
    }
    setForgotMsg("✅ Password changed! Please login with your new password.");
    setTimeout(() => {
      setShowForgot(false);
      setForgotStep(1);
      setForgotMsg("");
      setGmail("");
      setOtp("");
      setNewPass("");
    }, 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; min-height: 100vh; font-family: 'DM Sans', sans-serif; }
        .login-bg {
          min-height: 100vh; display: flex; align-items: center;
          justify-content: center; background: #0a0a0f;
          position: relative; overflow: hidden;
        }
        .login-bg::before {
          content: ''; position: absolute; width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,180,50,0.12) 0%, transparent 70%);
          top: -200px; left: -200px;
        }
        .login-bg::after {
          content: ''; position: absolute; width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,100,100,0.08) 0%, transparent 70%);
          bottom: -100px; right: -100px;
        }
        .login-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px; padding: 52px 44px; width: 420px;
          backdrop-filter: blur(20px); position: relative; z-index: 1;
          animation: fadeUp 0.6s ease;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .login-logo { text-align: center; margin-bottom: 36px; }
        .login-logo h1 { font-family:'Playfair Display',serif; font-size:2.4rem; font-weight:900; color:#f5c842; letter-spacing:-1px; }
        .login-logo p { color:rgba(255,255,255,0.35); font-size:0.85rem; margin-top:4px; letter-spacing:2px; text-transform:uppercase; }
        .field-label { display:block; color:rgba(255,255,255,0.5); font-size:0.75rem; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:8px; margin-top:20px; }
        .field-wrap { position:relative; }
        .login-input { width:100%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:14px 18px; color:#fff; font-family:'DM Sans',sans-serif; font-size:1rem; outline:none; transition:border-color 0.2s; }
        .login-input:focus { border-color:#f5c842; }
        .eye-btn { position:absolute; right:14px; top:50%; transform:translateY(-50%); background:none; border:none; color:rgba(255,255,255,0.4); cursor:pointer; font-size:1.1rem; padding:0; }
        .error-msg { background:rgba(255,80,80,0.12); border:1px solid rgba(255,80,80,0.3); color:#ff6b6b; border-radius:10px; padding:10px 14px; font-size:0.85rem; margin-top:16px; animation:shake 0.3s ease; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        .login-btn { width:100%; margin-top:28px; padding:15px; background:#f5c842; color:#0a0a0f; border:none; border-radius:12px; font-family:'DM Sans',sans-serif; font-size:1rem; font-weight:600; cursor:pointer; letter-spacing:0.5px; transition:all 0.2s; }
        .login-btn:hover { background:#ffd966; transform:translateY(-1px); box-shadow:0 8px 24px rgba(245,200,66,0.3); }
        .forgot-link { text-align:center; margin-top:16px; color:rgba(255,255,255,0.3); font-size:0.85rem; cursor:pointer; transition:color 0.2s; }
        .forgot-link:hover { color:#f5c842; }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:100; animation:fadeIn 0.2s ease; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal-box { background:#13131a; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:40px; width:380px; animation:fadeUp 0.3s ease; }
        .modal-box h3 { font-family:'Playfair Display',serif; color:#f5c842; font-size:1.5rem; margin-bottom:8px; }
        .modal-box p { color:rgba(255,255,255,0.4); font-size:0.85rem; margin-bottom:24px; }
        .modal-input { width:100%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:13px 16px; color:#fff; font-family:'DM Sans',sans-serif; font-size:0.95rem; outline:none; margin-bottom:12px; transition:border-color 0.2s; }
        .modal-input:focus { border-color:#f5c842; }
        .modal-btn { width:100%; padding:13px; background:#f5c842; color:#0a0a0f; border:none; border-radius:10px; font-weight:600; font-size:0.95rem; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; margin-bottom:10px; }
        .modal-btn:hover { background:#ffd966; }
        .modal-cancel { width:100%; padding:11px; background:transparent; color:rgba(255,255,255,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:10px; font-size:0.9rem; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .modal-cancel:hover { color:#fff; border-color:rgba(255,255,255,0.3); }
        .msg-success { color:#4ade80; font-size:0.85rem; margin-bottom:10px; }
        .msg-error { color:#ff6b6b; font-size:0.85rem; margin-bottom:10px; }
      `}</style>

      <div className="login-bg">
        <div className="login-card">
          <div className="login-logo">
            <h1>TrackWise 💰</h1>
            <p>Expense Intelligence</p>
          </div>
          <label className="field-label">Username</label>
          <input className="login-input" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          <label className="field-label">Password</label>
          <div className="field-wrap">
            <input className="login-input" type={showPass ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
            <button className="eye-btn" onClick={() => setShowPass(!showPass)}>{showPass ? "🙈" : "👁️"}</button>
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button className="login-btn" onClick={handleLogin}>Sign In →</button>
          <div className="forgot-link" onClick={() => setShowForgot(true)}>Forgot password?</div>
        </div>
      </div>

      {showForgot && (
        <div className="modal-overlay">
          <div className="modal-box">
            {forgotStep === 1 && (
              <>
                <h3>Reset Password</h3>
                <p>Enter your registered Gmail to receive an OTP.</p>
                <input className="modal-input" placeholder="Gmail address" value={gmail} onChange={e => setGmail(e.target.value)} />
                {forgotMsg && <p className={forgotMsg.startsWith("✅") ? "msg-success" : "msg-error"}>{forgotMsg}</p>}
                <button className="modal-btn" onClick={handleForgotEmail}>Send OTP</button>
                <button className="modal-cancel" onClick={() => { setShowForgot(false); setForgotMsg(""); setGmail(""); }}>Cancel</button>
              </>
            )}
            {forgotStep === 2 && (
              <>
                <h3>Enter OTP</h3>
                <p>Check your Gmail (or browser console for this demo) for the 6-digit OTP.</p>
                <input className="modal-input" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} />
                {forgotMsg && <p className={forgotMsg.startsWith("✅") ? "msg-success" : "msg-error"}>{forgotMsg}</p>}
                <button className="modal-btn" onClick={handleOTPVerify}>Verify OTP</button>
                <button className="modal-cancel" onClick={() => { setShowForgot(false); setForgotStep(1); setForgotMsg(""); }}>Cancel</button>
              </>
            )}
            {forgotStep === 3 && (
              <>
                <h3>New Password</h3>
                <p>Enter your new password below.</p>
                <input className="modal-input" type="password" placeholder="New password" value={newPass} onChange={e => setNewPass(e.target.value)} />
                {forgotMsg && <p className={forgotMsg.startsWith("✅") ? "msg-success" : "msg-error"}>{forgotMsg}</p>}
                <button className="modal-btn" onClick={handlePasswordChange}>Change Password</button>
                <button className="modal-cancel" onClick={() => { setShowForgot(false); setForgotStep(1); setForgotMsg(""); }}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── EXPENSE ITEM COMPONENT ───────────────────────────────────────────────────
function ExpenseItem({ e, onDelete }) {
  const categoryEmoji = {
    Food: "🍕", Transport: "🚗", Shopping: "🛍️",
    Health: "💊", Bills: "📄", Entertainment: "🎮",
  };
  return (
    <div className="expense-item">
      <div className="exp-icon">{categoryEmoji[e.category] || "💸"}</div>
      <div className="exp-info">
        <div className="exp-category">{e.category}</div>
        {e.note && <div className="exp-note">{e.note}</div>}
        <div className="exp-date">
          🕒 {e.created_at ? new Date(e.created_at).toLocaleString("en-IN") : "No date"}
        </div>
      </div>
      <div className="exp-amount">₹{Number(e.amount).toLocaleString("en-IN")}</div>
      <button className="del-btn" onClick={() => onDelete(e.id)} title="Delete">✕</button>
    </div>
  );
}

// ─── HISTORY TAB ──────────────────────────────────────────────────────────────
function HistoryTab({ expenses, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filtered = [...expenses]
    .filter(e => {
      const matchSearch = search === "" ||
        e.category.toLowerCase().includes(search.toLowerCase()) ||
        (e.note && e.note.toLowerCase().includes(search.toLowerCase()));
      const matchCat = filterCat === "" || e.category === filterCat;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.created_at) - new Date(a.created_at);
      if (sortOrder === "oldest") return new Date(a.created_at) - new Date(b.created_at);
      if (sortOrder === "highest") return b.amount - a.amount;
      if (sortOrder === "lowest") return a.amount - b.amount;
      return 0;
    });

  const totalFiltered = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
  const categories = [...new Set(expenses.map(e => e.category))];

  return (
    <div className="history-tab">
      {/* Filters */}
      <div className="filter-row">
        <input
          className="tw-input filter-search"
          placeholder="🔍 Search category or note..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="tw-input tw-select filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="tw-input tw-select filter-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {/* Summary bar */}
      <div className="history-summary">
        <span>{filtered.length} expense{filtered.length !== 1 ? "s" : ""}</span>
        <span className="history-total">Total: ₹{totalFiltered.toLocaleString("en-IN")}</span>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div>🔎</div>
          <p>No expenses match your filters.</p>
        </div>
      ) : (
        filtered.map(e => <ExpenseItem key={e.id} e={e} onDelete={onDelete} />)
      )}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // "home" | "recent" | "history"

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/expenses`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTotal = async () => {
    try {
      const res = await axios.get(`${API}/total`);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async () => {
    if (!amount || !category) return;
    setAdding(true);
    try {
      await axios.post(`${API}/add-expense`, { amount: parseFloat(amount), category, note });
      setAmount(""); setCategory(""); setNote("");
      fetchExpenses(); fetchTotal();
      showToast("✅ Expense added!");
    } catch (err) {
      console.error(err);
    }
    setAdding(false);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchExpenses(); fetchTotal();
    showToast("🗑️ Deleted");
  };

  useEffect(() => {
    fetchExpenses();
    fetchTotal();
  }, []);

  // Recent = last 5 expenses
  const recentExpenses = [...expenses].reverse().slice(0, 5);
  

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; font-family: 'DM Sans', sans-serif; min-height:100vh; }

        .dashboard { max-width: 540px; margin: 0 auto; padding: 32px 20px 100px; animation: fadeUp 0.5s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .top-bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; }
        .app-title { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:900; color:#f5c842; letter-spacing:-0.5px; }
        .logout-btn { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.5); padding:8px 16px; border-radius:8px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:0.82rem; transition:all 0.2s; }
        .logout-btn:hover { color:#fff; border-color:rgba(255,255,255,0.3); }

        /* TABS */
        .tab-bar {
          display: flex;
          gap: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 5px;
          margin-bottom: 24px;
        }
        .tab-btn {
          flex: 1;
          padding: 10px 6px;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
        .tab-btn:hover { color: rgba(255,255,255,0.7); }
        .tab-btn.active {
          background: #f5c842;
          color: #0a0a0f;
          font-weight: 600;
          box-shadow: 0 2px 12px rgba(245,200,66,0.25);
        }

        /* TOTAL CARD */
        .total-card { background:linear-gradient(135deg,#f5c842 0%,#f59e0b 100%); border-radius:20px; padding:28px; margin-bottom:24px; position:relative; overflow:hidden; }
        .total-card::after { content:'₹'; position:absolute; right:-10px; top:-20px; font-size:120px; color:rgba(0,0,0,0.06); font-family:'Playfair Display',serif; font-weight:900; }
        .total-label { color:rgba(0,0,0,0.5); font-size:0.78rem; letter-spacing:2px; text-transform:uppercase; margin-bottom:8px; }
        .total-amount { font-family:'Playfair Display',serif; font-size:2.8rem; font-weight:900; color:#0a0a0f; letter-spacing:-1px; }
        .total-count { color:rgba(0,0,0,0.4); font-size:0.82rem; margin-top:6px; }

        /* ADD FORM */
        .add-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:24px; margin-bottom:24px; }
        .add-card h3 { color:rgba(255,255,255,0.7); font-size:0.8rem; letter-spacing:2px; text-transform:uppercase; margin-bottom:16px; }
        .input-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px; }
        .tw-input { width:100%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:13px 16px; color:#fff; font-family:'DM Sans',sans-serif; font-size:0.95rem; outline:none; transition:border-color 0.2s; }
        .tw-input:focus { border-color:#f5c842; }
        .tw-input::placeholder { color:rgba(255,255,255,0.25); }
        .tw-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; cursor:pointer; }
        .tw-select option { background:#1a1a25; color:#fff; }
        .add-btn { width:100%; margin-top:4px; padding:14px; background:#f5c842; color:#0a0a0f; border:none; border-radius:12px; font-family:'DM Sans',sans-serif; font-weight:600; font-size:0.95rem; cursor:pointer; letter-spacing:0.3px; transition:all 0.2s; }
        .add-btn:hover:not(:disabled) { background:#ffd966; transform:translateY(-1px); box-shadow:0 6px 20px rgba(245,200,66,0.25); }
        .add-btn:disabled { opacity:0.6; cursor:not-allowed; }

        /* LIST HEADER */
        .list-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .list-header h3 { color:rgba(255,255,255,0.7); font-size:0.8rem; letter-spacing:2px; text-transform:uppercase; }
        .list-count { background:rgba(245,200,66,0.15); color:#f5c842; border-radius:20px; padding:3px 10px; font-size:0.78rem; font-weight:500; }

        /* VIEW ALL LINK */
        .view-all-btn {
          display: block;
          text-align: center;
          margin-top: 14px;
          padding: 12px;
          background: rgba(245,200,66,0.08);
          border: 1px solid rgba(245,200,66,0.2);
          color: #f5c842;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .view-all-btn:hover { background:rgba(245,200,66,0.14); }

        /* EXPENSE ITEMS */
        .expense-item { display:flex; align-items:center; gap:14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:14px 16px; margin-bottom:8px; transition:all 0.2s; animation:fadeUp 0.3s ease; }
        .expense-item:hover { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); }
        .exp-icon { width:40px; height:40px; background:rgba(245,200,66,0.12); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
        .exp-info { flex:1; min-width:0; }
        .exp-category { color:#fff; font-weight:500; font-size:0.95rem; }
        .exp-note { color:rgba(255,255,255,0.35); font-size:0.78rem; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .exp-date { color:rgba(255,255,255,0.2); font-size:0.72rem; margin-top:3px; }
        .exp-amount { font-family:'Playfair Display',serif; font-weight:700; color:#f5c842; font-size:1.05rem; flex-shrink:0; }
        .del-btn { background:rgba(255,80,80,0.1); border:1px solid rgba(255,80,80,0.2); color:#ff6b6b; border-radius:8px; width:32px; height:32px; cursor:pointer; font-size:0.85rem; display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0; }
        .del-btn:hover { background:rgba(255,80,80,0.2); transform:scale(1.05); }

        /* EMPTY STATE */
        .empty-state { text-align:center; padding:40px 20px; color:rgba(255,255,255,0.2); }
        .empty-state div { font-size:2.5rem; margin-bottom:10px; }
        .empty-state p { font-size:0.9rem; }

        /* HISTORY FILTERS */
        .history-tab { animation: fadeUp 0.3s ease; }
        .filter-row { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
        .filter-search { width:100%; }
        .filter-select { width:100%; }
        .history-summary { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:10px; margin-bottom:14px; color:rgba(255,255,255,0.4); font-size:0.82rem; }
        .history-total { color:#f5c842; font-weight:600; font-size:0.9rem; }

        /* RECENT TAB */
        .recent-tab { animation: fadeUp 0.3s ease; }
        .recent-header-info { background:rgba(245,200,66,0.06); border:1px solid rgba(245,200,66,0.15); border-radius:12px; padding:14px 16px; margin-bottom:16px; color:rgba(255,255,255,0.5); font-size:0.83rem; line-height:1.5; }
        .recent-header-info strong { color:#f5c842; }

        /* TOAST */
        .toast { position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:rgba(30,30,40,0.95); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px 24px; border-radius:30px; font-size:0.9rem; backdrop-filter:blur(10px); z-index:999; animation:toastIn 0.3s ease; box-shadow:0 8px 30px rgba(0,0,0,0.4); }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
      `}</style>

      <div className="dashboard">
        <div className="top-bar">
          <span className="app-title">TrackWise 💰</span>
          <button className="logout-btn" onClick={onLogout}>Sign out</button>
        </div>

        {/* TAB BAR */}
        <div className="tab-bar">
          <button className={`tab-btn ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
            🏠 Home
          </button>
          <button className={`tab-btn ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
            🕒 Recent
          </button>
          <button className={`tab-btn ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>
            📋 Full History
          </button>
        </div>

        {/* ── HOME TAB ── */}
        {activeTab === "home" && (
          <>
            <div className="total-card">
              <div className="total-label">Total Spent</div>
              <div className="total-amount">₹{Number(total).toLocaleString("en-IN")}</div>
              <div className="total-count">{expenses.length} expense{expenses.length !== 1 ? "s" : ""} tracked</div>
            </div>

            <div className="add-card">
              <h3>New Expense</h3>
              <div className="input-row">
                <input className="tw-input" type="number" placeholder="Amount ₹" value={amount} onChange={e => setAmount(e.target.value)} />
                <select className="tw-input tw-select" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Category</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Health</option>
                  <option>Bills</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>
              <input className="tw-input" placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} style={{ marginBottom: 10 }} />
              <button className="add-btn" onClick={addExpense} disabled={adding || !amount || !category}>
                {adding ? "Adding..." : "＋ Add Expense"}
              </button>
            </div>

            {/* Quick preview of last 3 */}
            <div className="list-header">
              <h3>Latest</h3>
              <span className="list-count">{expenses.length}</span>
            </div>

            {expenses.length === 0 ? (
              <div className="empty-state">
                <div>🪙</div>
                <p>No expenses yet. Add one above!</p>
              </div>
            ) : (
              <>
                {[...expenses].reverse().slice(0, 3).map(e => (
                  <ExpenseItem key={e.id} e={e} onDelete={deleteExpense} />
                ))}
                {expenses.length > 3 && (
                  <button className="view-all-btn" onClick={() => setActiveTab("history")}>
                    View all {expenses.length} expenses →
                  </button>
                )}
              </>
            )}
          </>
        )}

        {/* ── RECENT TAB ── */}
        {activeTab === "recent" && (
          <div className="recent-tab">
            <div className="recent-header-info">
              Showing your <strong>last 5 expenses</strong>. Switch to <strong>Full History</strong> to see everything with filters.
            </div>

            <div className="list-header">
              <h3>Recent Expenses</h3>
              <span className="list-count">{recentExpenses.length}</span>
            </div>

            {recentExpenses.length === 0 ? (
              <div className="empty-state">
                <div>🪙</div>
                <p>No expenses yet. Add one from Home!</p>
              </div>
            ) : (
              recentExpenses.map(e => <ExpenseItem key={e.id} e={e} onDelete={deleteExpense} />)
            )}

            {expenses.length > 5 && (
              <button className="view-all-btn" onClick={() => setActiveTab("history")}>
                View all {expenses.length} expenses →
              </button>
            )}
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === "history" && (
          <HistoryTab expenses={expenses} onDelete={deleteExpense} />
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn
    ? <Dashboard onLogout={() => setLoggedIn(false)} />
    : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}

export default App;
