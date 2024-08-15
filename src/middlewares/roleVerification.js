module.exports = async function (req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(404).json({message: "Access denied!"})
    };

    next();
};
    