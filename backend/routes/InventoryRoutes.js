const { fetchInvetory, createInventory } = require("../controller/InventoryController");
const router = require("express").Router();


router.get("/", fetchInvetory);
router.post("/addtyre", createInventory);





module.exports = router;