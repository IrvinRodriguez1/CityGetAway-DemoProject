const faker = require('faker')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');



const fullAddress = {
  city:faker.address.city(),
  state: faker.address.state()
}
console.log(fullAddress) 

