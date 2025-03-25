const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        // Get token from either cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "Please log in...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err);
                return res.status(401).json({
                    message: "Invalid or expired token. Please log in again.",
                    error: true,
                    success: false
                });
            }

            console.log("Decoded User ID:", decoded?._id);
            req.userId = decoded?._id; // Assign the decoded user ID

            next(); // Move to the next middleware/controller
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Authentication failed",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
