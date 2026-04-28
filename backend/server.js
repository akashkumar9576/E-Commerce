import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ static image folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// ✅ MONGODB SAFE CONNECT (NO CRASH)
// =======================

mongoose
  .connect(process.env.MONGO_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Error (ignored for now)");
  });

// =======================
// ✅ STATIC PRODUCTS (ALWAYS WORKING)
// =======================

const products = [
  {
    id: "1",
    name: "iPhone 15",
    price: 80000,
    image: "http://localhost:5000/uploads/iphone.jpg",
    description: "Apple iPhone 15 latest model",
  },
  {
    id: "2",
    name: "iPhone 16",
    price: 90000,
    image: "http://localhost:5000/uploads/iphone16.jpg",
    description: "Apple iPhone 16 new launch",
  },
  {
    id: "3",
    name: "Samsung Galaxy",
    price: 60000,
    image: "http://localhost:5000/uploads/samsung.jpg",
    description: "Samsung flagship phone",
  },
  {
    id: "4",
    name: "OnePlus 12",
    price: 55000,
    image: "http://localhost:5000/uploads/oneplus12.jpg",
    description: "Fast and smooth OnePlus",
  },
];

// =======================
// ✅ ROUTES
// =======================

// test
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found ❌" });
  }

  res.json(product);
});

// =======================
// ✅ ERROR HANDLER (IMPORTANT)
// =======================
app.use((err, req, res, next) => {
  console.log("Server Error:", err.message);
  res.status(500).json({ message: "Server Error" });
});

// =======================
// ✅ SERVER START
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});