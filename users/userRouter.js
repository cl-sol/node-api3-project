const express = require('express');
const user = require("../users/userDb")
const post = require("../posts/postDb")

const router = express.Router();

router.use(express.json())


router.post('/', validateUser, (req, res) => {
  // do your magic!
  user.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Could not add to database"
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id

  post.insert(id)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Could not add post to database"
      })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  user.get(req.query)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Could not retrieve user from database"
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  user.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Could not retrieve user from ID"
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  user.getUserPosts(req.params.id)
  .then(post => {
    if(post.length > 0) {
    res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "No posts found for specified user"
      })
    }  
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Could not retrieve post by user"
    })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  user.remove(req.params.id)
  .then(count => {
    if (count === 0) {
      res.status(200).json(count)
    } else {
      res.status(400).json({
        message: "User could not be found"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Could not delete specified user"
    })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  user.update(req.params.id, req.body)
    .then(user =>{
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "User could not be found"
        })
      }
    })
    .catch(err =>{ 
      console.log(err)
      res.status(500).json({
        message: "Could not retrieve updated user"
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id

    posts.getById(id)
        .then((user) => {
            if(user) {
                req.user = user
                next()
            } else {
                res.status(400).json({
                    message: "invalid user id"
                })
            }
        })
        .catch(next())
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body.id) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if(req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}

module.exports = router;
