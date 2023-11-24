const express = require('express');
const router = express.Router();
const Tags = require('../models/tags');

router.post('/', async (req, res) => {
  try {
    const tag = new Tags(req.body);
    await tag.save();
    res.status(201).send(tag);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const tags = await Tags.find();
    res.send(tags);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:name', async (req, res) => {
  try {
    const tag = await Tags.findById(req.params.name);
    if (!tag) {
      return res.status(404).send();
    }
    res.send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/:name', async (req, res) => {
  try {
    const tag = await Tags.findByIdAndUpdate(req.params.name, req.body, { new: true, runValidators: true });
    if (!tag) {
      return res.status(404).send();
    }
    res.send(tag);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/:name', async (req, res) => {
  try {
    const tag = await Tags.findByIdAndDelete(req.params.name);
    if (!tag) {
      return res.status(404).send();
    }
    res.send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;