const express = require('express')
const router = express.Router()
const wrapAsync = require('../utility/wrapAsync')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const userJs = require('../controllers/user')

//---Passport required calls for use 
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//---- render log in page
router.get('/login', userJs.renderLogin )

//--- using passport to authenticate log in 
router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/login'
}), userJs.successLoginRender)

router.get('/logout',userJs.logout )

//-----render signup page
router.get('/signup', userJs.renderSignup)


//----handles user signup ands saves to database
router.post('/signup', wrapAsync(userJs.createUser))

module.exports = router;