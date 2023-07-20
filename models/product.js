import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  supplier: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const ProductModal = mongoose.model("Product", productSchema);
export default ProductModal;
