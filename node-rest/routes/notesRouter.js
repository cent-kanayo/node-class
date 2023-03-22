// const express = require('express');
const { Router } = require('express');

const { createNote, getNotes, getSingleNote } = require('../controllers/Note');

// const router = express.Router();
const router = Router();

// router.get('/notes', getNotes);

// router.post('/notes', createNote);

router.route('/notes').get(getNotes).post(createNote);

// router.get('/notes/:id', (req, res) => {
//   // fetch single note
// });

// router.patch('/notes/:id', (req, res) => {
//   // update note
// });

// router.delete('/notes/:id', (req, res) => {
//   // delete note
// });

router.route('/notes/:id').get(getSingleNote);

module.exports = router;
