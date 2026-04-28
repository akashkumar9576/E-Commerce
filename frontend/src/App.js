import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Navbar
import MainNavbar from "./components/MainNavbar";

// Pages
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import MyAccount from "./pages/MyAccount";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout"; // 🔥 NEW

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <MainNavbar />

      {/* ROUTES */}
      <Routes>

        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/admin" element={<Admin />} />

        {/* 🔥 CHECKOUT ROUTE */}
        <Route path="/checkout" element={<Checkout />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;