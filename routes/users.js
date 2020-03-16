var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  let user = req.body
  user.id = users.length
  users.push(user)
  console.log(users)
  res.json(users[user.id])
});

/* GET users listing. */
router.get('/adduser', function (req, res, next) {
  res.render('adduser',{response: ""})
});
router.post('/adduser', function (req, res, next) {
  let user ={
    id: users.length,
    FName: req.body.FName,
    LName: req.body.LName, 
    password: req.body.password,
    email: req.body.email
  }
  users.push(user)
  res.render('adduser',{response: "User Added"})
});
/* Displays Update User */
router.get('/update', function (req, res, next) {
  res.render('update',{users,user: ""});
});
router.post('/update', function (req, res, next) {
  let index = req.body.id
  let user = users[index]
  for (key in user){
    if (req.body[key]!==''){
      user[key]=req.body[key]
    }
    users[index] = user
  }
  res.render('update',{users,user});
});
/*Displays Delete */
router.get('/delete', function (req, res, next) {
  res.render('delete', {users,response: ""});
});

router.post('/delete', function (req, res, next) {
  let response = "Invalid Entry"
  let foundUserIndex = users.findIndex((user)=>{
    let rtnValue= false
      if(req.body.email.toLowerCase()== user.email.toLowerCase()){
        rtnValue =true
      } 
      return rtnValue
  })
if(foundUserIndex != -1){
  if(users[foundUserIndex].password == req.body.password){
    response = `${users[foundUserIndex].FName} ${users[foundUserIndex].LName} has been deleted.`
    users.splice(foundUserIndex, 1)
  }
}
  res.render('delete',{users,response});
});

/* Password */
router.get('/password', function (req, res, next) {
  res.render('password', {users, response: ''});
});

router.post('/password', function (req, res, next) {
  let response = ""
  let foundUserIndex = users.findIndex((user)=>{
    let rtnValue= false
      if(req.body.email.toLowerCase()== user.email.toLowerCase()){
        rtnValue =true
      } 
      return rtnValue
  })
if(foundUserIndex != -1){
      response = "Your password is " + users[foundUserIndex].password
      
}
  res.render('password',{users,response});
});

/*Diplay login user */
router.get('/login', function (req, res, next) {
  res.render('login',{response: ""});
});

/*Diplay login user */
router.post('/login', function (req, res, next) {
  let response = "Invalid Login"
  let foundUser = users.find((user) => {
    let rtnVal = false
    if (req.body.email.toLowerCase()==user.email) {
      rtnVal = true
    }
    return rtnVal
    })
  if (foundUser !== undefined){
    if (foundUser.password === req.body.password){
    response = `${foundUser.FName} ${foundUser.LName}`
  }}
  res.render('login', { response });
});

module.exports = router;