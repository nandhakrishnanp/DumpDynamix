
const express = require('express');
const { getAllTruckData ,getTruckById, getTyreDataByTruck, getTyreDataByTyre, getClusturedData} = require('../controller/TruckController');
const router = express.Router();



router.get('/', getAllTruckData);
router.get('/tyre/:id', getTyreDataByTruck);
router.get('/tyre/id/:id', getTyreDataByTyre);
router.get('/:id', getTruckById);
router.get('/display/:id', getClusturedData);

module.exports = router;