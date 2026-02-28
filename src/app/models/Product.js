import mongoose, { Schema, model, models } from "mongoose";
import slugify from "slugify";

const ProductSchema = new Schema(
  {
    /* Basic Info */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
    },

    description: {
      type: String,
      default: "",
    },

    /* Images */
    image: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    /* Category */
    category: {
      type: String,
      required: true,
      enum: [
        "saree",
        "salwar-kamiz"
      ],
    },

    /* Color */
    color: {
      type: String,
      required: true,
    },

    /* Optional multiple colors */
    colors: {
      type: [String],
      default: [],
    },

    /* Price */
    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    /* Size */
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL", "Free"],
      default: ["Free"],
    },

    /* Stock */
    stock: {
      type: Number,
      default: 0,
    },

    /* Status */
    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTopSelling: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: true,
    },

    /* Stats */
    soldCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    /* Active */
    isActive: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: true,
  }
);


/* Auto slug */
ProductSchema.pre("save", async function (next) {

  if (this.isModified("name") || this.isNew) {

    let baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let counter = 1;

    const Product = mongoose.models.Product;

    while (
      await Product.findOne({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  next();
});


const Product =
  models.Product ||
  model("Product", ProductSchema);

export default Product;