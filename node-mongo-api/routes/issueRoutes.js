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
    const page = req.query.page;
    const pageSize = 5;
    const issues = await Issues.find();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if(req.query.page) {
      const pageData = issues.slice(startIndex, endIndex);
      res.send(pageData);
    } else {
      res.send(issues);
    }
   
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const issue = new Issues(req.body);
    await issue.save();
    res.status(200).send(issue);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:index', async (req, res) => {
  try {
    const issue = await Issues.find({ index: req.params.index });
    if (!issue) {
      return res.status(404).send();
    }
    res.send(issue);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:index', async (req, res) => {
  try {
    const filter = { index: req.params.index };
    if(req.body.upvotes) {
      const count = req.body.upvotes;
      const issue = await Issues.updateOne(filter, { $set: { upvotes: count } });
        if (!issue) {
          return res.status(404).send();
        }
        res.send(issue);
    } else {
      const issue = await Issues.updateOne(filter, { $set: { comments: req.body } });
        if (!issue) {
          return res.status(404).send();
        }
        res.send(issue);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/:index', async (req, res) => {
  try {
    const issue = await Issues.deleteOne({index: req.params.index});
    if (!issue) {
      return res.status(404).send();
    }
    res.send(issue);
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