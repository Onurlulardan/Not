const express = require('express');
const noteModel = require('../models/noteModel');
const { createNote, getAllNotes, getNoteByID ,deleteNote, updateNote } = require('../controllers/noteController');
const { authControl } = require('../middlewares/authControl');


const notesRouter = express.Router();

notesRouter.use(authControl);

//Add Note
notesRouter.post('/', createNote);

//Get all Notes
notesRouter.get('/', getAllNotes);

//Get Note by ID
notesRouter.get('/:id', getNoteByID);


//Delete Note by ID
notesRouter.delete('/:id', deleteNote);


//Update Note
notesRouter.patch('/:id', updateNote)

module.exports = notesRouter;