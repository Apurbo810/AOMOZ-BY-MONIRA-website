// models/Product.js
import mongoose, { Schema, model, models } from "mongoose";
import slugify from "slugify";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true, default: 0 },
    discountPercentage: { type: Number, required: true, default: 0 },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      default: "unisex",
    },
    category: {
      type: String,
      enum: [
        "Eau de Parfum",
        "Eau de Toilette",
        "Cologne",
        "Body Mist",
        "Attar",
      ],
      required: true,
    },
    description: { type: String },
    stock: { type: Number, default: 0 },
    // New size-related fields
    sizes: [
      {
        ml: { type: Number, required: true, enum: [10, 40] },
        price: { type: Number, required: true },
        discountPrice: { type: Number, default: 0 },
        discountPercentage: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
      },
    ],
    hasSizes: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("name")) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    const Product = mongoose.models.Product || model("Product", ProductSchema);
    while (await Product.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
