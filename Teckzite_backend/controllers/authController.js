const adminlogin = (req, res) => {
    try {
        const adminID = req.body.userid;
        const adminPD = req.body.password;
        if (adminID === process.env.userid && adminPD === process.env.password) {
            console.log('Admin LoggedIn')
            const token = jwt.sign(adminID, process.env.SECRET_KEY)
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch(err) {
        res.status(400).json({ message: "Internal service error" });
    }
}

module.exports = {adminlogin};