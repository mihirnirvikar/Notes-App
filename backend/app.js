const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const multer = require("multer");
const cors = require("cors");
const Note = require("./models/note");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads")); // for uploaded images
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Storage config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Connect DB
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ---------------------------------
// Routes
// ---------------------------------

// GET all notes
app.get("/notes", async (req, res) => {
  const allNotes = await Note.find({});
  res.render("home", { allNotes });
});

// POST new note
app.post("/notes", async (req, res) => {
  let { title, description, priority, dueDate } = req.body;
  if (Array.isArray(description)) {
    description = description.join("\n");
  }
  try {
    const newNote = new Note({
      title,
      description,
      priority,
      dueDate,
    });
    await newNote.save();
    res.redirect("/notes");
  } catch (error) {
    console.error(error);
  }
});

// GET single note (API)
app.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update note (API)
app.put("/notes/:id", async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

// POST image upload route (JoditEditor compatible)
app.post('/upload', upload.single('file'), (req, res) => {
  console.log("Upload request received");
  if (!req.file) {
    console.log("No file received");
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  console.log("File received:", req.file);
  const fileUrl = `http://localhost:${process.env.PORT || 3000}/uploads/${req.file.filename}`;
  return res.json({
    success: true,
    file: fileUrl,
    message: "Upload successful"
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}/notes`);
});
