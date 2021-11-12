const express = require('express')

const router = express.Router()
const wrapAsync = require('../utility/wrapAsync')


const vacationsJs = require('../controllers/vacations')
const validateNewCity = require('../utility/validateSchemas')
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage});


//-------------show all vactions in database
router.get('/vacations', wrapAsync(vacationsJs.index))

//----new city creation
router.post('/vacations', upload.single('imageURL'),  wrapAsync(vacationsJs.createCity))


//------------show details of a place
router.get('/vacations/:id',wrapAsync(vacationsJs.cityDetail))

//----------leave a review
router.get('/vacations/:id/review',wrapAsync(vacationsJs.reviewRender))

//--- new review creation
router.post('/vacations/:id/review',wrapAsync(vacationsJs.createReview))

//------------delete a city with their comments
router.delete('/vacations/:id',wrapAsync(vacationsJs.deleteCity))

module.exports = router;