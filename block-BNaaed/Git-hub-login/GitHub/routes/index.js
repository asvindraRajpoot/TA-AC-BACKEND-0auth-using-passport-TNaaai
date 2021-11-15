var express = require('express');
var router = express.Router();
var passport=require('passport');
var session=require('session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success',(req,res)=>{
  res.render('success');
})

router.get('/failure',(req,res)=>{
  res.render('failure');
})

router.get('/auth/github',(passport.authenticate('github')));

router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/failure'}),

(req,res)=>{
  res.redirect('/success');
}
    
)


router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect.sid'); 
  res.render('index',{ title: 'Express' });
})

module.exports = router;
