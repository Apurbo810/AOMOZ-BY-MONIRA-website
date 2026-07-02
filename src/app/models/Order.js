import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  slug: String,

  image: String,

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },

  size: {
    type: String,
    default: "Free",
  },

  color: {
    type: String,
    default: "",
  },

  total: {
    type: Number,
    required: true,
  }

});


const OrderSchema = new mongoose.Schema({

  /* Order ID */
  order_id: {
    type: String,
    required: true,
    unique: true,
  },

  /* User */
  user_email: {
    type: String,
    required: true,
  },

  /* Items */
  items: {
    type: [OrderItemSchema],
    required: true,
  },

  /* Pricing */
  subtotal: {
    type: Number,
    required: true,
  },

  discountTotal: {
    type: Number,
    default: 0,
  },

  total: {
    type: Number,
    required: true,
  },

  /* Payment */
  payment_method: {
    type: String,
    enum: ["BKASH", "COD"],
    required: true,
  },

  payment_status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },

  bkash_payment_id: String,
  bkash_trx_id: String,


  /* Order status */
  status: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ],
    default: "Pending",
  },


  /* Customer info */
  customer_name: {
    type: String,
    required: true,
  },

  customer_phone: {
    type: String,
    required: true,
  },

  customer_address: {
    type: String,
    required: true,
  },


  /* Admin */
  admin_notes: String,


}, {
  timestamps: true
});


export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);