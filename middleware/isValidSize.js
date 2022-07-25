async function isValidSize(req, res, next) {
  try {
    if (req.file.size / 1024 / 1024 <= 500) next();
    else throw { code: 400, message: "file must be up to 500mb" };
  } catch (err) {
    res.status(err.code).send(err.message);
  }
}
module.exports = { isValidSize };
