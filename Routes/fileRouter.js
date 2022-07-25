const express = require("express");
const router = express.Router();
const fileLogic = require("../BL/fileLogic");
const multer = require("multer");
const upload = multer();
const { isValidName } = require("../middleware/isValidName");
const { isValidExtension } = require("../middleware/isValidExtension");
const { isValidSize } = require("../middleware/isValidSize");
router.get("/download", async (req, res) => {
  try {
    const file = await fileLogic.downLoadFile(req.query.fileName);
    console.log(file.message);
    res.download(file.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
router.post(
  "/upload",
  upload.single("myFile"),
  isValidName,
  isValidExtension,
  isValidSize,
  async (req, res) => {
    try {
      console.log(req.query.path);
      console.log(req.file);

      await fileLogic.createFile(
        req.file.originalname,
        req.file.buffer,
        req.query.path
      );
      res.send("ok");
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);
router.put("/rename", isValidName, isValidExtension, async (req, res) => {
  try {
    const renamedFile = await fileLogic.renameFile(
      req.body.path,
      req.body.oldName,
      req.body.newName
    );
    res.status(renamedFile.code).send(renamedFile.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const deletedfile = await fileLogic.deleteFile(req.query.fileName);
    res.status(deletedfile.code).send(deletedfile.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
module.exports = router;
