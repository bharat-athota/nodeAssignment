const express = require('express');
const router = express.Router();
const Issues = require('../models/issues');

router.post('/', async (req, res) => {
  try {
    const issue = new Issues(req.body);
    await issue.save();
    res.status(201).send(issue);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const issues = await Issues.find();
    res.send(issues);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:name', async (req, res) => {
  try {
    const issue = await Issues.findById(req.params.name);
    if (!issue) {
      return res.status(404).send();
    }
    res.send(issue);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/:name', async (req, res) => {
  try {
    const issue = await Issues.findByIdAndUpdate(req.params.name, req.body, { new: true, runValidators: true });
    if (!issue) {
      return res.status(404).send();
    }
    res.send(issue);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
router.delete('/:name', async (req, res) => {
  try {
    const issue = await Issues.findByIdAndDelete(req.params.name);
    if (!issue) {
      return res.status(404).send();
    }
    res.send(issue);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;