// notes related endpoints will be written here
const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const Notes = await Note.find({ user: req.user.id });
    res.json(Notes);
  } catch {
    console.error(error.message); // sending error message on console
    res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
  }
});

//Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title").isLength({ min: 3 }).withMessage("Title is required"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors, return then return 400 bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch {
      console.error(error.message); // sending error message on console
      res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
    }
  }
);

//Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required

router.put(
  "/updatenote/:id",
  fetchUser,
  async (req, res) => {
    const { title, description, tag } = req.body;
try{
    const newNote={};
    if (title){newNote.title=title};
    if (description){newNote.description=description};
    if (tag){newNote.tag=tag};

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note){
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);
    }catch {
      console.error(error.message); // sending error message on console
      res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
    }
   });

   //Route 4: DELETE an existing note using: DELETE "/api/notes/deletenote/:id". Login required

router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
   try{
    // find the note to be DELETE and DELETE it
    let note = await Note.findById(req.params.id);
    if (!note){
      return res.status(404).send("Not Found");
    }

    //allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  }catch (error) {
      console.error(error.message); // sending error message on console
      res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
    }
   });
// notes related end point we will write here
module.exports = router;
