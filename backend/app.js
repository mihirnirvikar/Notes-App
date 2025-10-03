const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const ejsMate = require('ejs-mate');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static('public'));



app.get("/notes", (req, res) => {
  res.render('home')
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/notes');
});

