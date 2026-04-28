import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainNavbar.css";

function MainNavbar() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // CART COUNT
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(totalQty);
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        Advanced<span>Shop</span>
      </div>

      {/* SEARCH */}
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* MENU */}
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/account">My Account</Link>
        <Link to="/admin">Admin</Link>
      </div>

    </div>
  );
}

export default MainNavbar;