import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => alert("Error loading product"));
  }, [id]);

  if (!product) return <h2 style={{ padding: 20 }}>Loading...</h2>;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.find((i) => i.id === product.id);

    if (exist) {
      cart = cart.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart ✅");
  };

  const buyNow = () => {
    localStorage.setItem("cart", JSON.stringify([{ ...product, qty: 1 }]));
    window.location.href = "/checkout";
  };

  return (
    <div style={{ display: "flex", padding: 40, gap: 40 }}>
      {/* IMAGE */}
      <div style={{ flex: 1 }}>
        <img
          src={product.image}
          alt=""
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* DETAILS */}
      <div style={{ flex: 1 }}>
        <h1>{product.name}</h1>
        <h2 style={{ color: "green" }}>₹ {product.price}</h2>
        <p>{product.description}</p>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={addToCart}
            style={{
              background: "#2874f0",
              color: "white",
              padding: "10px 20px",
              border: "none",
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={buyNow}
            style={{
              background: "#fb641b",
              color: "white",
              padding: "10px 20px",
              border: "none",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;