// app/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  subtotal: { type: Number, default: 0 },
  discountTotal: { type: Number, default: 0 },
  originalTotal: { type: Number, default: 0 },
  payment_method: { type: String, required: true }, // "BKASH", "COD"
  user_email: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Processing, Delivered, Cancelled
  customer_name: String,
  customer_phone: String,
  customer_address: String,
  
  // bKash payment fields
  bkash_payment_id: { type: String, default: null },
  bkash_trx_id: { type: String, default: null },
  payment_status: { type: String, default: "Pending" }, // Pending, Completed, Failed
  
  admin_notes: { type: String, default: null },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);