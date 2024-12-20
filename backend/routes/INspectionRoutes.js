const { assignInspectiontoAll, getInspectionByVehicleId, completeInspection, assignInspectionByVechicleId } = require('../controller/InspectionControler');

const router = require('express').Router();







router.get('/:vehicleId', getInspectionByVehicleId);
router.get('/assign', assignInspectiontoAll);
router.get('/assign/:vehicleId', assignInspectionByVechicleId);

router.post('/complete', completeInspection);

module.exports = router;