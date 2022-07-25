const express = require("express");
const router = express.Router();
const foldeRLogic = require("../BL/folderLogic");
const { isValidFolderName } = require("../middleware/isValidFolderName");

router.post("/create", isValidFolderName, async (req, res) => {
  try {
    const newFolder = await foldeRLogic.createFolder(req.body);
    console.log(newFolder);
    res.status(newFolder.code).send(newFolder.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
router.get("/get", async (req, res) => {
  try {
    console.log("params " + req.query.folderName);
    const folderContent = await foldeRLogic.readFolder(req.query.folderName);
    res.status(folderContent.code).send(folderContent.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
router.put("/rename", isValidFolderName, async (req, res) => {
  try {
    console.log(req.body);
    const renamedFolder = await foldeRLogic.renameFolder(
      req.body.path,
      req.body.oldName,
      req.body.newName
    );
    res.status(renamedFolder.code).send(renamedFolder.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
router.delete("/delete", async (req, res) => {
  try {
    console.log(req.query.folderName);
    const deletedfolder = await foldeRLogic.deleteFolder(req.query.folderName);
    res.status(deletedfolder.code).send(deletedfolder.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
module.exports = router;
