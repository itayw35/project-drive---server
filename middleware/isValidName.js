async function isValidName(req, res, next) {
  try {
    const file = req.file ? req.file.originalname : req.body.newName;
    if (["/", "\\", ",", "<", ">"].find((char) => file.includes(char))) {
      throw { code: 400, message: "invalid name" };
    } else {
      next();
    }
  } catch (err) {
    res.status(err.code).send(err.message);
  }
}
module.exports = { isValidName };
