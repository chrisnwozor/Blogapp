import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import Blog from "./models/blog.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import job from "./cron.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

job.start();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database is Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email and password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email and password" });
    }
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, name: user.name }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Login Successful", token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const lowerCaseEmail = email.toLowerCase();
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: lowerCaseEmail,
      password: hashpassword,
    });
    await newUser.save();
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .status(201)
      .json({ message: "User Saved Successfully", token, name: newUser.name });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

app.post("/addblog", async (req, res) => {
  const { title, author, image, message } = req.body;
  try {
    if (!title || !message || !image) {
      return res
        .status(400)
        .json({ message: "Title,message,image link required" });
    }
    const newBlog = new Blog({
      title,
      author: author || "Anonymous",
      image,
      message,
      date: new Date(),
    });
    await newBlog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

app.get("/blog", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res.status(400).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog id" });
  }
  const { title, image, author, message } = req.body;
  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        image,
        message,
        author,
      },
      { new: true, runValidators: true }
    );
    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
