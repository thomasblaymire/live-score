import jwt from "jsonwebtoken";
export const verifyAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No authentication token." });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the userId to the request object
        req.userId = decodedToken.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
