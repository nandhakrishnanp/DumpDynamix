const AdminSchmea = require("../model/AdminSchmea");
const bcrypt = require('bcrypt');

const RegisterAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        
        const admin = new AdminSchmea({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });

        await admin.save();

        return res.status(201).json({ message: "Admin created successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const LoginAdmin = async (req, res) => {

    const { email, password ,token } = req.body;

    try {
        const admin = await AdminSchmea.findOne({ email });
         
        if (admin && (await bcrypt.compare(password, admin.password))) {
            if(token){

                admin.token = token;
            }
            await admin.save();
            return res.json({ message: "Login successful" ,
                adminId : admin._id,
                admin: admin
             }).status(200);
        }

        return res.json({ message: "Invalid credentials" }).status(401);
    } catch (error) {

        return res.json({ error: error.message }).status(500);
    }
}

const LogoutAdmin = async (req, res) => {
    const { email } = req.body;
    try {
        const admin = await AdminSchmea.findOne({ email });
        if (admin) {
            admin.token = null;
            await admin.save();
            return res.json({ message: "Logout successful" }).status(200);
        }
        return res.json({ message: "Invalid credentials" }).status(401);
    }
    catch (error) {
        return res.json({ error: error.message }).status(500);
    }
}

module.exports = { RegisterAdmin, LoginAdmin ,LogoutAdmin };