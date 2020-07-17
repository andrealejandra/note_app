//dependencies
var express = require("express");
var path = require("path");
var notesData = require("./db/db.json");
//var {v4 : uuidv4} = require("uuid");
//
var app = express();
var PORT = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//show main pg
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
  });
//show notes pg
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

//retrieves saved notes
app.get("/api/notes", function(req, res) {
    return res.json(notesData);
  });

//post
app.post("/api/notes", function(req, res) {
  req.body.id = Math.random();
  notesData.push(req.body);
      res.json(true);
});

//delete
app.delete("/api/notes/:id", function(req, res) {
  var noId = req.params.id;
  notesData = notesData.filter(note => 
    note.id ==! noId);
    res.json({ ok: true });

});

  
//listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });