var passport=require('passport');
var User=require('../model/user');
require('dotenv').config()
var GitHubStrategy=require('passport-github').Strategy
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

passport.serializeUser((user,done)=>{
    console.log(user);
    done(null,user.id);
    
})

passport.deserializeUser((id,done)=>{
    User.findById(id,'name email username',(err,user)=>{
        done(err,user)
    })

})