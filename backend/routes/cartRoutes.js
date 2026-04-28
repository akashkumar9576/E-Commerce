import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  try {
    const { product } = req.body;

    let item = await Cart.findOne({ productId: product._id });

    if (item) {
      item.qty += 1;
    } else {
      item = new Cart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    await item.save();
    res.json({ message: "Added to cart" });

  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET CART */
router.get("/", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

/* UPDATE QTY */
router.put("/:id", async (req, res) => {
  const { qty } = req.body;

  const item = await Cart.findById(req.params.id);
  item.qty = qty;
  await item.save();

  res.json(item);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed" });
});

export default router;