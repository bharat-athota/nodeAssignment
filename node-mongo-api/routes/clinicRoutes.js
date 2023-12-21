const express = require('express');
const router = express.Router();
const Clinics = require('../models/clinics');

router.post('/', async (req, res) => {
  try {
    const clinic = new Clinics(req.body);
    await clinic.save();
    res.status(200).send(clinic);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const clinics = await Clinics.find();
    res.send(clinics)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:index', async (req, res) => {
  try {
    const clinic = await Clinics.find({ index: req.params.index });
    if (!clinic) {
      return res.status(404).send();
    }
    res.send(clinic);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/:index', async (req, res) => {
  try {
    const filter = { index: req.params.index };
    const updateData = req.body;
    const clinic = await Clinics.updateOne(filter, { $set: updateData })
    if (!clinic) {
      return res.status(404).send();
    }
    res.send(clinic);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/:index', async (req, res) => {
  try {
    const clinic = await Clinics.deleteOne({index: req.params.index});
    if (!clinic) {
      return res.status(404).send();
    }
    res.send(clinic);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;