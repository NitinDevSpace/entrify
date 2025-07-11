const theaterRouter = require('express').Router();
const Theater = require('../models/theaterModel');
const {
    addTheater,
    deleteTheater,
    getAllTheaters,
    updateTheater,
    getOwnerTheaters,
} = require('../controllers/theaterController');

theaterRouter.post('/add-theater', addTheater);
theaterRouter.get('/get-all-theaters', getAllTheaters);//for admin
theaterRouter.get('/get-owner-theaters/:ownerId', getOwnerTheaters);//for owner
theaterRouter.put('/update-theater', updateTheater);
theaterRouter.delete('/delete-theater/:theaterId', deleteTheater);


module.exports = theaterRouter;


