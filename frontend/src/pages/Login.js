import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = () => {

    // 🔥 Dummy login (no backend required)
    if (form.email && form.password) {
      const user = {
        name: form.email.split("@")[0],
        email: form.email
      };

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Success ✅");
      navigate("/");
    } else {
      alert("Enter details ❌");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;