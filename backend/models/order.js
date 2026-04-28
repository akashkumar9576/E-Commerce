import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        image: {
          type: String,
          default: "",
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      default: "Placed",
    },

    // 🔥 CANCEL / RETURN STATUS
    isCancelled: {
      type: Boolean,
      default: false,
    },

    isReturned: {
      type: Boolean,
      default: false,
    },

    shipping: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },
  },
  {
    timestamps: true, // ✅ date + time (createdAt, updatedAt)
  }
);

export default mongoose.model("Order", orderSchema);