const express = require("express");
const router = express.Router();

router.use("/folders", require("./folderRouter"));
router.use("/files", require("./fileRouter"));
module.exports = router;
