async function isValidExtension(req, res, next) {
  try {
    const fileName = req.file ? req.file.originalname : req.body.newName;
    const ext = fileName.slice(fileName.lastIndexOf(".") + 1);
    if (
      [
        "pdf",
        "txt",
        "doc",
        "pages",
        "docx",
        "jpg",
        "jpeg",
        "heif",
        "heic",
      ].find((char) => ext == char)
    ) {
      next();
    } else {
      throw { code: 400, message: "illegal file type" };
    }
  } catch (err) {
    res.status(err.code).send(err.message);
  }
}
module.exports = { isValidExtension };
