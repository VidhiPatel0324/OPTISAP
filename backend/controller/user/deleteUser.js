const userModel = require("../../models/userModel");

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
                error: true,
            });
        }

        res.json({
            message: "User deleted successfully.",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error.",
            success: false,
            error: true,
        });
    }
}

module.exports = deleteUser;
