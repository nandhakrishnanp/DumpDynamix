const OperatorSchmea = require("../model/OperatorSchmea");
const bcrypt = require("bcrypt");
const VechicleSchmea = require("../model/VechicleSchmea");
const sendMail = require("../util/nodemailer");


const RemoveAndCeateOperator = async (req, res) => {
  try {
    const { operator_id, vehicle_id, name, email, phone_number } = req.body;

    if (!operator_id || !vehicle_id || !name || !email || !phone_number) {
      return res.json({ message: "All fields are required" }).status(400);
    }

    const operator = await OperatorSchmea.findOneAndUpdate(
      { operator_id },
      {
        $set: {
          operator_id,
          name,
          email,
          phone_number,
          password: name+vehicle_id,
        },
      },
      { new: true } // Return the updated operator document
    );

    if (!operator) {
      return res.status(404).json({ message: "Operator not found" });
    }

    // Define the password and send email
    const password = name + vehicle_id;
    await sendMail(email, password);

    return res.status(200).json({
      message: "Operator created and Assigned successfully",
      operator_id: operator._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const LoginOperator = async (req, res) => {
  const { email, password, token  } = req.body;

  try {
    const operator = await OperatorSchmea.findOne({ email });

    if (operator && operator.password == password) {
      operator.token = token;
      await operator.save();
      return res
        .json({ message: "Login successful", operator : operator })
        .status(200);
    } else {
      return res.json({ message: "Invalid credentials" }).status(401);
    }
  } catch (error) {
    return res.json({ message: "Invalid credentials" }).status(401);
  }
};

const LogoutOperator = async (req, res) => {

  const { email } = req.body;
  try {
    const operator = await OperatorSchmea.findOne({ email });
    if (operator) {
      operator.token = null;
      await operator.save();
      return res.json({ message: "Logout successful" }).status(200);
    }
    return res.json({ message: "Invalid credentials" }).status(401);
  }
  catch (error) {
    return res.json({ error: error.message }).status(500);
  }
}


const fecthOPeratorByVechicleId = async (req, res) => {
  const { vehicle_id } = req.body;
  try {
    const vehicle = await VechicleSchmea.findOne({ vehicle_id });
    if (!vehicle) {
      return res.json({ message: "Vehicle not found" }).status(404);
    }

    const operator_id = vehicle.operator_id;
    const operator = await OperatorSchmea.findOne({ operator_id });

    if (!operator) {
      return res.json({ message: "Operator not found" }).status(404);
    }

    return res.json({ operator }).status(200);
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
}
module.exports = { RemoveAndCeateOperator, LoginOperator ,LogoutOperator ,fecthOPeratorByVechicleId };


