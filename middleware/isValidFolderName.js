async function isValidFolderName(req, res, next) {
  try {
    const name = req.body.folderName ? req.body.folderName : req.body.newName;
    if (name.includes(" ")) {
      throw { code: 400, message: "invalid name" };
    } else {
      next();
    }
  } catch (err) {
    res.status(err.code).send(err.message);
  }
}
module.exports = { isValidFolderName };
