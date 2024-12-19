import jwt from 'jsonwebtoken';
import Users from '../../Models/UserModel.js';

let Authorization = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "You are not allowed to access this webpage." });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        let user = await Users.findById(decoded.userId);

        if (!user) {
            return res.status(403).json({ message: "Invalid token or user does not exist." });
        }

        req.userId = decoded.userId;
        req.userRole = user.role;

        next(); 
    } catch (error) {
        console.log("Authorization error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

export default Authorization;
