const router = require('express').Router()
const { getMaintance, getMaintancebyDate, getMaintanceTeamById, getAllMaintanceTeam, CreateMaintance, getmaintancebyTeamId } = require('../controller/MaintanceController')


router.get('/getMaintance', getMaintance);
router.get('/getMaintance/:scheduledDate', getMaintancebyDate)
router.get('/getMaintanceteam/:id' , getMaintanceTeamById);
router.get('/getMaintanceteam', getAllMaintanceTeam);
router.post('/addMaintanance', CreateMaintance);
router.get('/getMaintancebyTeamId/:id', getmaintancebyTeamId);
module.exports = router

