const fs = require("fs");
const path = require("path");
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("./scratch");

// 获取同级目录中的 JSON 文件路径
const jsonFilePath = path.join(__dirname, "../data.json");

function getjson() {
  // 读取 JSON 文件
  fs.readFileSync(jsonFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("An error occurred:", err);
      return;
    }
    // 解析 JSON 文件内容
    const jsonData = JSON.parse(data);
    // 存储json数据
    localStorage.setItem("appid", jsonData.appid);
    localStorage.setItem("secret", jsonData.secret);
  });
}

module.exports = getjson;
