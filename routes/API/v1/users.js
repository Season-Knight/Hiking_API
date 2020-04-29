var express = require('express');
var router = express.Router();
const db = require('../../../db/mongooseUsers') //mongoose is currently working, mongo causes blank object
// const db = require ('../../../db/mongo')
const bcrypt = require('bcrypt')
const { makeToken, verifyToken } = require('../../../bin/jwt')
const passport = require('passport')


router.get('/:id', function (req, res, next) {
  let readObj = {
    id: req.params.id,
    usersCollection: req.app.locals.usersCollection
  }
  db.readOne(readObj)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});
//get all
router.get('/:id', function (req, res, next) {
  let readOne = {
    id: req.params.id,
    usersCollection: req.app.locals.usersCollection

  }
  db.readOne(readOne)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
});

router.delete('/:id', verifyToken, function (req, res, next) {
  let deleteObj = {
    id: req.params.id,
    usersCollection: req.app.locals.usersCollection
  }
  db.del(deleteObj)
    .then(response => {
      if (response.deletedCount == 1) {
        res.json({})
      } else {
        throw new Error("Not Deleted")
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500)
    })
});

router.put('/:id', function (req, res, next) {
  let putObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }
  db.readOne(putObj)
    .then(response => {

      if (response == null) {
        db.create(putObj)
        //add if not found
      } else {
        //udpate if found
        db.replace(putObj)
          .then(response => {
            res.json(response)
          })
      }
      res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.patch('/:id', async function (req, res, next) {
  let patchObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }

  //try,catch helps to catch errors?
  try {
    //see if we have one to update
    let response = await db.readOne(patchObj)

    //if no record was found
    if (response == null) {
      throw new Error("not found")

    } else {
      //update the one we found
      await db.update(patchObj)
      //respond with the result from the db
      res.json(await db.readOne(patchObj))
    }

  }
  catch (error) {
    res.status(500).json(error)

  }
}); //end of readOne

//create a user
router.post('/signup', async function (req, res, next) {

  let newUser = { ...req.body }
  delete newUser.password

  let passwordHash = await bcrypt.hash(req.body.password, 13)

  newUser.passwordHash = passwordHash

  console.log({ newUser })

  let createObj = {

    doc: newUser,
    usersCollection: req.app.locals.usersCollection
  }
  db.create(createObj)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});
//Components Login
router.post('/', function (req, res, next) {
  console.log(req.body.email)

  db.findOne({
    query: {
      email:
        req.body.email
    }
  })
    .then((user) => {
      bcrypt.compare(req.body.password, user.passwordHash)
        .then(match => {

          if (match) {
            //delete this line maybe?
            delete user.passwordHash

            makeToken(user)
              .then(token => {

                res.json({ token, userId: user._id })
              })
          } else {
            throw new Error("Bad Login")
          }
        })

    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })

  //convert function to authenticate from db
  console.log("post")
  //temp code

})

//GET for Google AUTH
//use passport.authenticate() as route middleware to authenticate the 
//request. The first step in google auth will

router.get('/auth/googlelogin',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/auth/googlecallback',
  passport.authenticate('google', { failureRedirectd: '/', session: false }),
  function (req, res) {
    console.log(req.user)
    makeToken({ email: req.user.emails[0].value })//google returns an array of emails, use the first one
      .then(token => {

        res.redirect(`http://localhost:3000?token=${token}`)
        // res.json({ token, userId: user._id })
      })
      .catch(error => {

        console.log(error)
        res.status(500)
      })

  })

router.post('/auth/verifytoken', verifyToken, function (req, res, next) {
  console.log("VERIFY TOKEN")
  db.findOne({ query: { email: req.email } })
    .then((user) => {
      delete user.passwordHash

      makeToken(user)
        .then(token => {
          console.log("TOKEN")
          console.log(token)
          res.json({ token, userId: user._id })
        })

    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
})




module.exports = router;
