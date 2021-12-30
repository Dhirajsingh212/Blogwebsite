const Catagory = require('./../models/Categorymodel');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const newCat = await Catagory.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const cats = await Catagory.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
