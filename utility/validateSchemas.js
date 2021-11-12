const Joi = require('joi')


const validateNewCity = (req, res, next) =>{
  const schema = Joi.object({
    city:Joi.string().trim().min(3).max(30).required(),
    state: Joi.string().trim().min(3).max(30).required(),
    
    // imageURL: Joi.string().trim().min(3).required(),
    
    })
    console.log(req.body)
    const checked = schema.validate(req.body)
    console.log(checked)
    if(checked.error){
     console.log(checked.error.details[0].message)
     next(checked.error.details[0].message)
    }else{
      next()
    }
}

module.exports = validateNewCity;