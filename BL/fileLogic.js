const fs = require("fs");
function createFile(file, data, path) {
  if (isExist(`root/${path}/${file}`))
    throw { code: 400, message: "file already exist" };
  if (path) {
    if (!isExist(`root/${path}`)) throw { code: 400, message: "wrong path" };
    fs.writeFileSync(`root/${path}/${file}`, data, { encoding: "utf-8" });
  } else {
    fs.writeFileSync(`root/${file}`, data, { encoding: "utf-8" });
  }
  return { code: 200, message: "file created!" };
}
function downLoadFile(name) {
  const folderPath = `root/${name}`;
  console.log(folderPath);
  const file = fs.readFileSync(folderPath);
  if (!file) throw { code: 400, message: "file does not exist" };
  return {
    code: 200,
    message: `./${folderPath}`,
  };
}
function isExist(file) {
  return fs.existsSync(file);
}
function renameFile(path, oldName, newName) {
  if (!isExist(`root/${path}/${oldName}`))
    throw { code: 400, message: `file does not exist in ${path}` };
  fs.renameSync(`root/${path}/${oldName}`, `root/${path}/${newName}`);
  return { code: 200, message: "file was renamed" };
}
function deleteFile(name) {
  if (!isExist(`root/${name}`))
    throw { code: 400, message: `file does not exist` };
  fs.unlinkSync(`root/${name}`);
  return { code: 200, message: "file deleted" };
}

module.exports = { downLoadFile, createFile, renameFile, deleteFile };
