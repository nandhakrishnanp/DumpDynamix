const runLLM = require('../llm/Gemini');
const { GenrateReport } = require('../Report/TruckReport');

const router = require('express').Router();




router.post('/generate', GenrateReport);
router.get('/llm/:truckId',runLLM);
module.exports = router;