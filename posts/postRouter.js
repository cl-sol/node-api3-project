const express = require('express');
const posts = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Error retrieving posts"
      })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
    .then(count => {
      if(count === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist"
        })
      } else {
        res.status(200).json(count)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not delete post"
      })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.update(req.params.id, req.body)
    .then(post => { 
      if(post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: "Post could not be found"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Post could not be updated"
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
const id = req.params

posts.getById(id)
  .then(post => {
    if(post) {
      req.post = post
      next()
    } else {
      res.status(400).json({message: "Invalid post id"})
    }
  })
  .catch(next)
}

module.exports = router;
