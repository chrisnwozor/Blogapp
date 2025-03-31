import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
