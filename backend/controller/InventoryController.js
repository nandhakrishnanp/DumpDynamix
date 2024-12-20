const DumpTruckTyre = require("../model/InventorySchmea");

const fetchInvetory = async (req, res) => {
  try {
    const data = await DumpTruckTyre.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInventory = async (req, res) => {
  const inventory = req.body;
  const newInventory = new DumpTruckTyre(inventory);
  try {
    await newInventory.save();
    res.status(201).json({
      message: "Inventory created successfully",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



module.exports = { fetchInvetory, createInventory };
