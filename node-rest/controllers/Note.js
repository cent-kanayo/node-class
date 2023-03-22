const Note = require('../models/Note');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');

const getNotes = asyncHandler(async (req, res) => {
  const headers = req.headers.authorization;
  const id = headers.split(' ')[1];
  // fetch all notes
  const notes = await Note.find({ _id: id });
  if (!notes.length) {
    res.status(404).json({ status: 'Fail', result: [] });
  } else {
    res.status(200).json({ status: 'Success', result: notes });
  }
});
const createNote = asyncHandler(async (req, res) => {
  const headers = req.headers.authorization;
  if (!headers) {
    throw new BadRequest('No headers provided');
  }
  const id = headers.split(' ')[1];

  const { title, body } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new Unauthorized('Unauthorized');
  }
  const createNote = await Note.create({ title, body, userId: id });
  if (!createNote) {
    throw new Error('Some went Wrong wrong');
  }
  return res.status(201).json({ status: 'Success', result: createNote });
});

const getSingleNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: 'No specific resource specified' });
  }
  const getNote = await Note.findById(id);
  if (!getNote) {
    return res
      .status(404)
      .json({ msg: "Couldn't find the note with id " + id });
  }
  res.status(200).json(getNote);
});

module.exports = { createNote, getNotes, getSingleNote };
