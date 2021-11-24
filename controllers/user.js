
const User = require('../models/user')

module.exports.renderLogin = (req, res, next) => {

  res.render('login')
}

module.exports.successLoginRender = (req, res) => {

  req.flash('success', `Welcome Back, ${req.user.firstName}` )
  res.redirect('/')
}

module.exports.logout = (req, res)=>{
  req.logout();
  req.session.destroy(function(err) {
    // console.log(err)
 })
  res.redirect('/')
}

module.exports.renderSignup = (req, res, next) => {
  res.render('signup')
}

module.exports.createUser = async (req, res, next) => {
  const avatar = 'https://res.cloudinary.com/dqcdo8wwg/image/upload/v1636665785/CityGetAway/PngItem_786293_qypuqz.png'

  const {
    firstName,
    lastName,
    username,
    password
  } = req.body

  const newUser = new User({
    firstName,
    lastName,
    username,
    avatar
  })

 try{
  const registerUser = await User.register(newUser, password)
   req.login(registerUser, err=>{
    if(err){
      return next(err)
    }
    req.flash('success', 'Succesfully Signed Up')
    res.redirect('vacations')
  })
  
 }catch(err){
      req.flash('error', `${err.message}`)
      res.redirect('signup')
 }
  
  
  
}