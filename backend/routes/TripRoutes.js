const { getTripsById, addTripsbyId ,updateStatusCompletion, getLatestTrip } = require('../controller/TripController');

const router = require('express').Router();


router.get("/:vehicle_id" , getTripsById)
router.post("/newtrip" , addTripsbyId )
router.post("/updatestatus" ,updateStatusCompletion)
router.get("/latesttrip/:vehicle_id" , getLatestTrip)

module.exports = router