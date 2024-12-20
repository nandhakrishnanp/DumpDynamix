
const express = require('express');
const { RegisterAdmin, LoginAdmin, LogoutAdmin } = require('../controller/UserController');
const { RemoveAndCeateOperator, LoginOperator, LogoutOperator ,fecthOPeratorByVechicleId } = require('../controller/OPeratorController.js');
const router = express.Router();

router.post('/register', RegisterAdmin);
router.post('/login', LoginAdmin);
router.post('/remove', RemoveAndCeateOperator);
router.post('/logoutAdmin',LogoutAdmin);
router.post('/loginoperator', LoginOperator);
router.post('/logoutOperator',LogoutOperator)
router.post('/fetchoperator',fecthOPeratorByVechicleId)

module.exports = router;