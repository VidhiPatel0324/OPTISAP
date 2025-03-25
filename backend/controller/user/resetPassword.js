const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await UserModel.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }, // Token is valid only if not expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token." });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        res.json({ success: true, message: "Password reset successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = resetPassword;
