import React, { useEffect, useState } from "react";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const updateStatus = (id, status) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));

    alert("Order Updated ✅");
  };

  return (
    <div style={{ padding: "30px", background: "#f1f3f6", minHeight: "100vh" }}>
      <h2>🛠️ Admin Panel (Orders Control)</h2>

      {orders.length === 0 ? (
        <h3>No Orders ❌</h3>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={card}>
            <h3>Order ID: {order.id}</h3>

            <p><b>Name:</b> {order.name}</p>
            <p><b>Mobile:</b> {order.mobile}</p>
            <p><b>Total:</b> ₹ {order.total}</p>

            <p>
              <b>Status:</b>{" "}
              <span style={{ color: "green" }}>{order.status}</span>
            </p>

            {/* PRODUCTS */}
            {order.items.map((item) => (
              <div key={item.id} style={itemRow}>
                <img src={item.image} alt="" style={img} />
                <div>
                  <p>{item.name}</p>
                  <p>₹ {item.price} × {item.qty}</p>
                </div>
              </div>
            ))}

            {/* STATUS BUTTONS */}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button style={btnBlue} onClick={() => updateStatus(order.id, "Shipped")}>
                Ship
              </button>

              <button style={btnBlue} onClick={() => updateStatus(order.id, "Out for Delivery")}>
                Out for Delivery
              </button>

              <button style={btnGreen} onClick={() => updateStatus(order.id, "Delivered")}>
                Delivered
              </button>

              <button style={btnRed} onClick={() => updateStatus(order.id, "Cancelled")}>
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* STYLES */

const card = {
  background: "#fff",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
};

const img = {
  width: "70px",
  height: "70px",
  borderRadius: "8px",
  marginRight: "10px",
};

const btnBlue = {
  background: "#2874f0",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const btnGreen = {
  background: "green",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const btnRed = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Admin;