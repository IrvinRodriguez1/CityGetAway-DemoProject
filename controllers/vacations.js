const Vacation = require('../models/vacation')
const Comment = require('../models/comments')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({accessToken: process.env.MBX_TOKEN})


module.exports.index =async (req,res, next)=>{
   
  const vacation = await Vacation.find({});
 res.render('show', {vacation})
}

module.exports.createCity = async(req, res, next)=>{
  // console.log(req.body)
  let {city, state} = req.body
  city = city.trim()
  state = state.trim()
  const URL = req.file.path
  const {filename} = req.file
  const result = await geocodingClient.forwardGeocode({
   query: `${city},${state}`,
   limit: 1
 }).send()
 
 
 if(!result.body.features.length){
   return next(' Validating if place is real failed please try again')
 }
 
 const geometry = result.body.features[0].geometry
  const votes = 1
 const newVacation = new Vacation({
   city: city.toUpperCase(),
   state: state.toUpperCase(),
   votes,
   imageURL: {
     URL,
     filename
   },
   geometry
 })

 await newVacation.save()
 
res.redirect(`/vacations/${newVacation.id}`)

}

module.exports.cityDetail = async (req, res,next)=>{

  const {id} = req.params
  const vacationID = await Vacation.findById(id)
  const cityComments = await Comment.find({cityID:id}).populate('userID', 'firstName lastName avatar')
  // console.log(cityComments)
  let user=''
  if(req.user){
    user = req.user.id
  }else{
    user = 'none'
  }
  
  
  res.render('details', {vacationID, cityComments,user})
}

module.exports.reviewRender = async (req, res, next)=>{
  if(!req.user){
    req.flash('error', 'Sign In Required To Submit A Comment')
    return res.redirect('/login')
  }
  const {id}=req.params
  const city = await Vacation.findById(id)
  
  res.render('review',{id, city})
}

module.exports.createReview = async (req, res, next)=>{
 
  const {id} = req.params
  const {comment,rating} = req.body
  
  const newComment = new Comment({
    comment: comment,
    cityID: id,
    userID: req.user.id,
    rating: rating
  })
  
  await newComment.save()
  res.redirect(`/vacations/${id}`)
}

module.exports.deleteCity = async (req, res, next)=>{
  const {id} = req.params
  await Vacation.findByIdAndDelete(id)
  await Comment.deleteMany({cityID:id})
 res.redirect('/vacations')
}

module.exports.deleteComment = async(req,res,next)=>{
  const {comment,id} = req.params;
  // console.log(comment)

  await Comment.findByIdAndDelete(comment)
  res.redirect(`/vacations/${id}`)
}