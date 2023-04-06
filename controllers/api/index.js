const router = require("express").Router();
const homeRoutes = require("../homeRoutes.js");
const commentRoutes = require("./commentRoutes.js");
const postRoutes = require("./postRoutes.js");
const userRoutes = require("./userRoutes.js");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
