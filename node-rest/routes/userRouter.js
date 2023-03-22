// const express = require('express');
const { Router } = require('express');
const User = require('../models/User');

// const router = express.Router();
const router = Router();

router.get('/users', async (req, res) => {
  // fetch all notes
  try {
    const notes = await User.find();
    if (!notes.length) {
      return res.status(404).json({ status: 'Fail', result: [] });
    } else {
      return res.status(200).json({ status: 'Success', result: notes });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'Fail', result: 'Something went wrong, try again' });
  }
});

router.post('/register', async (req, res) => {
  // create new note

  const { firstName, lastName, email, password, cpassword } = req.body;
  if (!firstName || !lastName || !email || !password || !cpassword) {
    return res
      .status(400)
      .json({ status: 'Fail', result: 'All field are required' });
  }
  if (password !== cpassword) {
    return res
      .status(400)
      .json({ status: 'Fail', result: 'Password mismatch' });
  }
  try {
    // const getUser = await User.findById(id);
    // if (!getUser) {
    //   res.status(401).json({ status: 'Fail', result: 'User is unauthorized' });
    // }
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    });
    if (!User) {
      return res.status(500).json({ status: 'Fail', result: [] });
    } else {
      const getUser = await User.findById(user._id).select('-password');
      return res.status(201).json({ status: 'Success', result: getUser });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'Fail', result: 'Something went wrong, try again' });
  }
});

router.get('/user/:id', (req, res) => {
  // fetch single note
});

router.patch('/user:id', (req, res) => {
  // update note
});

router.delete('/user/:id', (req, res) => {
  // delete note
});

module.exports = router;
