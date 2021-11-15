var passport=require('passport');
var User=require('../models/user');
require('dotenv').config()
var GitHubStrategy=require('passport-github').Strategy
var GoogleStrategy=require('passport-google').Strategy
passport.use(new GitHubStrategy({

    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'/auth/github/callback'
},(accessToken,refreshToken,profile,done)=>{
//console.log(profile);
var profileData={
    name:profile.displayName,
    username:profile.username,
    email:profile._json.email,
    photo:profile._json.avatar_url
}
User.findOne({email:profile._json.email},(err,user)=>{
    if(err)return done(err);
    if(!user){
        
        User.create(profileData,(err,addedUser)=>{
            //console.log('in error',err);
            if(err)return done(err);
            // console.log('inside create');
            // console.log(addedUser);
            return done(null,addedUser);
        })
    }
    done(null,user);
})



}))

passport.use(new GoogleStrategy({

    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    returnURL: 'http://localhost:3000/auth/google/callback',
    realm: 'http://localhost:3000'
   // callbackURL:'/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
//console.log(profile);
var profileData={
    name:profile.displayName,
    username:profile.username,
    email:profile._json.email,
    photo:profile._json.avatar_url
}
User.findOne({email:profile._json.email},(err,user)=>{
    if(err)return done(err);
    if(!user){
        
        User.create(profileData,(err,addedUser)=>{
            //console.log('in error',err);
            if(err)return done(err);
            // console.log('inside create');
            // console.log(addedUser);
            return done(null,addedUser);
        })
    }
    done(null,user);
})



}))

passport.serializeUser((user,done)=>{
    console.log(user);
    done(null,user.id);
    
})

passport.deserializeUser((id,done)=>{
    User.findById(id,'name email username',(err,user)=>{
        done(err,user)
    })

})