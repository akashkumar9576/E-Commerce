import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // 🔥 IMPORTANT FIX (id normalize)
        const fixedData = data.map((item, index) => ({
          ...item,
          id: item.id || item._id || index + 1, // fallback
        }));

        setProducts(fixedData);
      });
  }, []);

  // ADD TO CART
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart ✅");
  };

  return (
    <div style={{ padding: "30px", background: "#f1f3f6" }}>
      <h2>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {/* 🔥 IMAGE CLICK FIX */}
            <img
              src={product.image}
              alt=""
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = `/product/${product.id}`;
              }}
            />

            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>

            {/* ADD TO CART */}
            <button
              style={{
                background: "#2874f0",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "6px",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              style={{
                background: "#fb641b",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "6px",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.setItem(
                  "cart",
                  JSON.stringify([{ ...product, qty: 1 }])
                );
                window.location.href = "/checkout";
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;