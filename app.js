if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
  


const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Vacation = require('./models/vacation')
const methodOverride = require('method-override')
const wrapAsync = require('./utility/wrapAsync')
const session = require('express-session')
const flash = require('connect-flash');
const vacationRouter = require('./routes/vacationRoute')
const userRouter = require('./routes/userRoute')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({accessToken: process.env.MBX_TOKEN})
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');


//const dbURL = process.env.DB_URL
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/vacation';

//'mongodb://localhost:27017/vacation'
//-----conecting to the db
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs')

//-----------parse the body
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//sanatize the query
app.use(mongoSanitize());
//-----to use delete and put methods
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'));

const secret = process.env.SECRET || 'whenNotInProductionThisIsMySecret'
// create a session for 7 days expiration
app.use(session({
  secret: secret , 
  saveUninitialized:true,
  resave: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7 //milliseconds
  },
  store: MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 3600 // seconds
  })
}))
//---flash feature for express
app.use(flash());

//--adding the flash error and success to locals for easier use
app.use((req, res, next)=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.session = req.session;
  next()
})



//--user routes from routes/userRoute.js
app.use('/', userRouter);

//--using vacation routes which can be found in routes/vacationRoute.js   
app.use('/', vacationRouter);



//-----Home Page----------------------
app.get('/', wrapAsync(async (req,res, next)=>{
  const database = await Vacation.find({});
 
  
  res.render('home',{database})
}))

app.get('/search', wrapAsync(async (req,res, next)=>{
  
  const {city, state} = req.query;
  const result = await geocodingClient.forwardGeocode({
    query: `${city},${state}`,
    limit: 1
  }).send()
   const matchFound = await Vacation.findOne({city: city.toUpperCase(), state: state.toUpperCase()})
  if(!matchFound){
    req.flash('error', 'location not found please try a different place')
   return  res.redirect('/')
  }
  
   res.redirect(`http://localhost:3000/vacations/${matchFound.id}`)
  
  res.send('working so far')
  
}))


//---------render the create new vacations page
app.get('/new', (req,res)=>{
  if(!req.user){
    req.flash('error', 'Sign In Required To Submit A New City')
    return res.redirect('/login')
  }

  res.render('new')
})


// handles any 404 pages
app.use(function (req, res, next) {
  res.render('error.ejs')
  
})

// error handling middleware
app.use(function (err, req, res, next) {
  console.log(err)
  req.flash('error', err)
  res.redirect('/')
})




app.listen(3000, ()=>{
  console.log('Listening at port 3000')
})