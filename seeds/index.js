const mongoose = require('mongoose')
const Vacation = require('../schema/vacation')
const cities = require('./cities')

mongoose.connect('mongodb://localhost:27017/vacation', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> {
    console.log('Database Connected')
})


const seedDB = async ()=>{

await Vacation.deleteMany({})
for(let i=0; i<20;i++){
  const random1000= Math.floor(Math.random()*1000)
  const vacationSite = new Vacation({
    city: cities[random1000].city.toUpperCase(),
    state: cities[random1000].state.toUpperCase(),
    votes: Math.floor(Math.random()*50),
    imageURL: {
      URL: 'https://res.cloudinary.com/dqcdo8wwg/image/upload/v1636403337/CityGetAway/bdcuj4uuycgp58jdmnub.jpg',
      filename: 'CityGetAway/bdcuj4uuycgp58jdmnub'
    },
    geometry: {
      type: 'Point',
      coordinates: [cities[random1000].longitude, cities[random1000].latitude]
    }
  })
  await vacationSite.save()
}
}




seedDB()
.then(()=>{
     mongoose.connection.close()
})