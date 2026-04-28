import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details ❌");
      return;
    }

    const order = {
      id: Date.now(),
      ...form,
      items: cart,
      total,
      status: "Placed",
      date: new Date().toLocaleString(),
    };

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([order, ...oldOrders]));

    localStorage.removeItem("cart");

    alert("Order Placed Successfully ✅");
    navigate("/orders");
  };

  return (
    <div style={container}>
      {/* LEFT SIDE */}
      <div style={left}>
        <h2>📦 Delivery Address</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} style={input} />
        <input name="phone" placeholder="Mobile Number" onChange={handleChange} style={input} />
        <textarea name="address" placeholder="Full Address" onChange={handleChange} style={textarea} />
        <input name="city" placeholder="City" onChange={handleChange} style={input} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} style={input} />

        <h3 style={{ marginTop: "20px" }}>💳 Payment Method</h3>
        <div style={paymentBox}>
          <p>✔ Cash on Delivery</p>
          <p>✔ UPI / Card (Demo)</p>
        </div>

        <button style={orderBtn} onClick={placeOrder}>
          Place Order
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div style={right}>
        <h3>🧾 Order Summary</h3>

        {cart.map((item) => (
          <div key={item.id} style={itemRow}>
            <img src={item.image} alt="" style={img} />

            <div>
              <p>{item.name}</p>
              <p>₹ {item.price} × {item.qty}</p>
            </div>
          </div>
        ))}

        <hr />

        <h2>Total: ₹ {total}</h2>
      </div>
    </div>
  );
}

/* STYLES */

const container = {
  display: "flex",
  gap: "20px",
  padding: "30px",
  background: "#f1f3f6",
  minHeight: "100vh",
};

const left = {
  flex: 2,
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const right = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  height: "fit-content",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const textarea = {
  ...input,
  height: "80px",
};

const paymentBox = {
  background: "#f1f3f6",
  padding: "10px",
  borderRadius: "5px",
  marginTop: "10px",
};

const orderBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  background: "#fb641b",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const itemRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const img = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: "5px",
};

export default Checkout;