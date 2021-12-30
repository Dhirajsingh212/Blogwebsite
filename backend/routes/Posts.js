const User = require('./../models/Usermodel');
const Post = require('./../models/Postsmodel');
const router = require('express').Router();

// CREATE

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('you can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();

        res.status(200).json('deleted post successfully');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('you can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS

router.get('/', async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        catagories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
