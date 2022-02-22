const router = require("express").Router()
const dashboardRoutes = require("./dashboard.js")
const authRoutes = require("./jwtAuth")

router.use("/dashboard", dashboardRoutes);
router.use("/auth", authRoutes);

module.exports = router