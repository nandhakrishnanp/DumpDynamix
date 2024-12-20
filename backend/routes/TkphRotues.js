const router = require("express").Router()
const calculateTKPH = require("../controller/TkphController")
const { getTKPHHistoryById } = require("../controller/TruckController")
const TkphHistory = require("../model/TkphHistory")






router.get("/:vehicle_id",calculateTKPH)

router.get("/history/:vehicle_id",getTKPHHistoryById)



module.exports = router