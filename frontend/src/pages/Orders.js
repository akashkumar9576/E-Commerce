import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "#2874f0";
      case "Shipped":
        return "orange";
      case "Out for Delivery":
        return "#ff9f00";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      case "Returned":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f1f3f6", minHeight: "100vh" }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <h3>No Orders ❌</h3>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={card}>
            <div style={topRow}>
              <div>
                <p><b>Order ID:</b> {order.id}</p>
                <p><b>Date:</b> {order.date}</p>
              </div>

              <div>
                <span style={{
                  background: getStatusColor(order.status),
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px"
                }}>
                  {order.status}
                </span>
              </div>
            </div>

            <hr />

            {/* USER DETAILS */}
            <p><b>Name:</b> {order.name}</p>
            <p><b>Mobile:</b> {order.mobile}</p>
            <p><b>Address:</b> {order.address}</p>

            {/* PRODUCTS */}
            {order.items.map((item) => (
              <div key={item.id} style={itemRow}>
                <img src={item.image} alt="" style={img} />

                <div>
                  <h4>{item.name}</h4>
                  <p>₹ {item.price} × {item.qty}</p>
                </div>
              </div>
            ))}

            <h3 style={{ marginTop: "10px" }}>Total: ₹ {order.total}</h3>
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

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  marginTop: "15px",
  gap: "15px",
};

const img = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "10px",
};

export default Orders;