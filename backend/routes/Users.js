const bcrypt = require('bcrypt');
const User = require('./../models/Usermodel');
const Post = require('./../models/Postsmodel');
const router = require('express').Router();

// UPDATE

router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You Can Update Only Your Account');
  }
});

// DELETE

router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json('user not found');

    try {
      await Post.delteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json('user has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You Can delete Only Your Account');
  }
});

// GET USER

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
