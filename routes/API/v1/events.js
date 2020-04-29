var express = require('express');
var router = express.Router();
const db = require ('../../../db/mongooseEvents') //mongoose is currently working, mongo causes blank object
// const db = require ('../../../db/mongo')

router.get('/:id', function (req, res, next){
  let readObj = {
    id:req.params.id,
    eventsCollection: req.app.locals.eventsCollection
  }
  db.readOne(readObj)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.status(500)
  })
});
//get all
router.get('/', function (req, res, next){
  let readObj = {
       eventsCollection: req.app.locals.eventsCollection
       
  }
   db.readAll(readObj)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    console.log(error)
    res.json(error)
  })
});

router.delete('/:id', function (req, res, next) {
  let deleteObj = {
    id:req.params.id,
    eventsCollection: req.app.locals.eventsCollection
  }
  db.del(deleteObj)
  .then(response => {
    if (response.deletedCount == 1){
      
      res.json({})
    }
    else{
      throw new Error ("Not Deleted")}
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
    eventsCollection: req.app.locals.eventsCollection
  }
  db.readOne(putObj)
  .then(response => {

    if (response == null){
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
    res.status(500)
  })
});

router.patch('/:id', async function (req, res, next) {
  let patchObj = {
    id: req.params.id,
    doc: req.body,
    eventsCollection: req.app.locals.eventsCollection
  }

  //try,catch helps to catch errors?
  try {
    //see if we have one to update
  let response = await db.readOne(patchObj)
   
      //if no record was found
    if (response == null){
      throw new Error("not found")
           
    } else {
        //update the one we found
       await db.update(patchObj)
        //respond with the result from the db
        res.json(await db.readOne(patchObj))
      }
      
      }
      catch(error) {
        res.status(500)
      
    }
}); //end of readOne

router.post('/', function (req, res, next) {
    console.log(req.body)
  let createObj = {
    doc: req.body,
    eventsCollection : req.app.locals.eventsCollection
  }
  db.create(createObj)
  .then(response => {
    res.json(response)
  })
  .catch(error =>{
    res.status(500)
  })
});

module.exports = router;
