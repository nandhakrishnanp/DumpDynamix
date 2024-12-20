const { fetchNotificationByVechicleId ,fetchAllNotification, getFailureSuggtion } = require("../controller/NotificationController");

const router = require("express").Router();






router.get("/:id", fetchNotificationByVechicleId);
router.get("/", fetchAllNotification);
router.post("/find", getFailureSuggtion);

module.exports = router;