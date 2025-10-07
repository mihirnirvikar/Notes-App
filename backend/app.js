const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Note = require("./models/note");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


app.get("/notes", async(req, res) => {
  const allNotes = await Note.find({});
  res.render("home", {allNotes});
});

app.post("/notes", async(req, res) => {
  const newNote = new Note(req.body);
  const result = await newNote.save();
  res.redirect("/notes");
});

// Show edit form for a note
app.get('/notes/:id/edit', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('edit', { note });
});

// Update note route (using method-override for PUT)
app.put('/notes/:id', async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description, priority, dueDate });
  res.redirect('/notes');
});

































app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}/notes`);
});
