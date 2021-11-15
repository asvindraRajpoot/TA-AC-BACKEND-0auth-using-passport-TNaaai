var express = require('express');
var router = express.Router();
var passport=require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index');
});

router.get('/success',(req,res)=>{
  res.render('success');
})

router.get('/failure',(req,res)=>{
  res.render('failure');
})

router.get('/auth/github',(passport.authenticate('github')));

router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/failure',session:false}),

(req,res)=>{
  res.redirect('/success');
}
    
)

router.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){
    // The request will be redirected to Google for authentication, so
    // this function will not be called.
  });

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });




module.exports = router;
