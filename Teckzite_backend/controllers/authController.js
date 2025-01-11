const jwt = require('jsonwebtoken');
const adminlogin = (req, res) => {
    try {
        const adminID = req.body.userid;
        const adminPD = req.body.password;
        if (adminID === process.env.userid && adminPD === process.env.password) {
            console.log('Admin LoggedIn')
            console.log('SECRET_KEY:', process.env.SECRET_KEY);
            const payload = {
                id: adminID,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY)
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch(err) {
        res.status(400).json({ message: "Internal service error" });
    }
}

module.exports = {adminlogin};