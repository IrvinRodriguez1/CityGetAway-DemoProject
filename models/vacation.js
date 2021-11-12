 const mongoose = require('mongoose');
 const {Schema}=mongoose;
//mongoose.connect('mongodb://localhost:27017/vacation');
const opts = { toJSON: { virtuals: true } };

const VacationSchema = new Schema({
  city:String,
  state: String,
  votes: Number,
  imageURL: {
    URL:String,
    filename: String
  },
  geometry: {
    type:{
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, opts)

VacationSchema.virtual('properties.popUpMarkup').get(function() {
  return `<a href="vacations/${this._id}">${this.city}, ${this.state}</a>`
})


 

module.exports = mongoose.model('Vacation', VacationSchema)