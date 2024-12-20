const { addExpense, getExpenses , topPerformingTyres, LeastPerformingTyres, topMiscellaneousCostTyres, getPerformanceScores} = require('../controller/ExpenseSchmea');

const router = require('express').Router();




router.post('/add', addExpense);
router.get('/get/:tyre_id', getExpenses);
router.get('/topTyres' , topPerformingTyres);
router.get('/leastTyres', LeastPerformingTyres);
router.get('/topcost', topMiscellaneousCostTyres)
router.get('/performance', getPerformanceScores)
module.exports = router;