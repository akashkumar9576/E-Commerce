import React, { useState, useEffect } from "react";

function MyAccount() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [orders, setOrders] = useState([]);

  // LOAD DATA
  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem("address"));
    if (savedAddress) setAddress(savedAddress);

    const orderData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(orderData);
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // SAVE ADDRESS
  const saveAddress = () => {
    localStorage.setItem("address", JSON.stringify(address));
    alert("Address Saved ✅");
  };

  return (
    <div style={{ padding: "30px", background: "#f1f3f6", minHeight: "100vh" }}>
      <h2>👤 My Account</h2>

      <div style={container}>
        {/* LEFT PROFILE */}
        <div style={card}>
          <h3>Profile</h3>
          <p><b>Name:</b> Akash Kumar</p>
          <p><b>Email:</b> akash@gmail.com</p>
          <p><b>Phone:</b> 9876543210</p>

          <button style={btn}>Edit Profile</button>
          <button style={logout}>Logout</button>
        </div>

        {/* RIGHT ADDRESS */}
        <div style={card}>
          <h3>📍 Saved Address</h3>

          {/* INPUT FORM */}
          <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} style={input} />
          <input name="phone" placeholder="Mobile Number" value={address.phone} onChange={handleChange} style={input} />
          <textarea name="address" placeholder="Full Address" value={address.address} onChange={handleChange} style={textarea} />
          <input name="city" placeholder="City" value={address.city} onChange={handleChange} style={input} />
          <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} style={input} />

          <button style={saveBtn} onClick={saveAddress}>Save Address</button>

          {/* DISPLAY ADDRESS (FIXED) */}
          {address.name && (
            <div style={addressBox}>
              <p><b>{address.name}</b></p>
              <p>{address.address}</p>
              <p>{address.city} - {address.pincode}</p>
              <p>📞 {address.phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* ORDER HISTORY */}
      <div style={{ marginTop: "30px" }}>
        <h3>📦 Order History</h3>

        {orders.length === 0 ? (
          <p>No Orders ❌</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={orderCard}>
              <p><b>Order ID:</b> {order.id}</p>
              <p><b>Status:</b> {order.status}</p>

              {order.items.map((item) => (
                <div key={item.id} style={itemRow}>
                  <img src={item.image} alt="" style={img} />
                  <div>
                    <p>{item.name}</p>
                    <p>₹ {item.price} × {item.qty}</p>
                  </div>
                </div>
              ))}

              <h4>Total: ₹ {order.total}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* STYLES */

const container = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
};

const textarea = {
  ...input,
  height: "70px",
};

const saveBtn = {
  marginTop: "10px",
  background: "#2874f0",
  color: "#fff",
  padding: "10px",
  border: "none",
};

const addressBox = {
  marginTop: "15px",
  padding: "10px",
  background: "#f1f3f6",
  borderRadius: "5px",
};

const btn = {
  marginTop: "10px",
  background: "#2874f0",
  color: "#fff",
  padding: "8px",
  border: "none",
};

const logout = {
  marginLeft: "10px",
  background: "red",
  color: "#fff",
  padding: "8px",
  border: "none",
};

const orderCard = {
  background: "#fff",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
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
};

export default MyAccount;