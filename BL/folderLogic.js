const fs = require("fs");

function createFolder(name) {
  const { folderName } = name;
  if (!isExist(folderName)) {
    fs.mkdirSync(`root/${folderName}`);
  } else {
    throw {
      code: 400,
      message: "file name already exists. please use another name",
    };
  }
  return { code: 200, message: "ok" };
}
function readFolder(name) {
  if (name) {
    if (!isExist(name)) {
      throw { code: 400, message: "folder does not exist" };
    }
  } else {
    name = "";
  }

  const folderPath = `root/${name}`;
  const isFile = (fileName) => {
    return fs.lstatSync(fileName.name).isFile();
  };
  const isFolder = (fileName) => {
    return !fs.lstatSync(fileName).isFile();
  };
  const files = fs
    .readdirSync(folderPath)
    .map((fileName) => {
      return { name: "".concat(folderPath, "/", fileName) };
    })
    .filter(isFile);
  files.forEach((file) => {
    file.stats = fs.statSync(file.name);
  });
  const folders = fs
    .readdirSync(folderPath)
    .map((fileName) => {
      return "".concat(folderPath, "/", fileName);
    })
    .filter(isFolder);

  return { code: 200, message: { files: files, folders: folders } };
}
function isExist(name) {
  return fs.existsSync(`root/${name}`);
}
function renameFolder(path, oldName, newName) {
  if (!isExist(`${path}/${oldName}`))
    throw { code: 400, message: `folder does not exist in ${path}` };
  if (isExist(`${path}/${newName}`))
    throw {
      code: 400,
      message: "file name already exists. please use another name",
    };
  fs.renameSync(`root/${path}/${oldName}`, `root/${path}/${newName}`);
  return { code: 200, message: "folder was renamed" };
}
function deleteFolder(name) {
  if (!isExist(name)) throw { code: 400, message: `folder does not exist` };
  const files = fs.readdirSync(`root/${name}`);
  if (files.length > 0) {
    files.forEach((file) => {
      const f = fs.lstatSync(`root/${name}/${file}`).isFile();
      console.log(f);
      fs.lstatSync(`root/${name}/${file}`).isFile()
        ? fs.unlinkSync(`root/${name}/${file}`)
        : deleteFolder(`${name}/${file}`);
    });
  }
  fs.rmdirSync(`root/${name}`);
  return { code: 200, message: "folder deleted" };
}
module.exports = { createFolder, readFolder, renameFolder, deleteFolder };
