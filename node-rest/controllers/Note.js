const Note = require('../models/Note');
const User = require('../models/User');

const getNotes = async (req, res) => {
  const headers = req.headers.authorization;
  const id = headers.split(' ')[1];
  // fetch all notes
  try {
    const notes = await Note.find({ userId: id });
    if (!notes.length) {
      res.status(404).json({ status: 'Fail', result: [] });
    } else {
      res.status(200).json({ status: 'Success', result: notes });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 'Fail', result: 'Something went wrong, try again' });
  }
};
const createNote = async (req, res) => {
  const headers = req.headers.authorization;
  const id = headers.split(' ')[1];
  const { title, body } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: 'Fail', result: 'User is not authorized' });
    }
    const createNote = await Note.create({ title, body, userId: id });
    if (!createNote) {
      return res
        .status(500)
        .json({ status: 'Fail', result: 'Something went wrong, try again' });
    }
    return res.status(201).json({ status: 'Success', result: createNote });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'Fail', result: 'Something went wrong, try again' });
  }
};

module.exports = { createNote, getNotes };
