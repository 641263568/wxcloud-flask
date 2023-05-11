const axios = require("axios");
const fs = require("fs");
const path = require("path");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

async function getWxCodeToken() {
  try {
    let appid, secret;
    // 读取appid和secret
    try {
      // 构建 data.json 文件的路径
      const parentDir = path.resolve(__dirname, "..");
      const dataFilePath = path.join(parentDir, "data.json");
      const data = fs.readFileSync(dataFilePath, "utf-8");
      // 解析 JSON 文件内容
      ({ appid, secret } = JSON.parse(data));
    } catch (err) {
      console.error("读取appid失败:", err);
      return;
    }
    if (!appid || !secret) {
      console.error("appid或secret不存在");
      return;
    }
    // 获取access_token
    const params = {
      grant_type: "client_credential",
      appid, // 请替换为你的 appid
      secret, // 请替换为你的 secret
    };
    const res = await axios.get("http://api.weixin.qq.com/cgi-bin/token", {
      params,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
      },
    });

    const access_token = res.data.access_token;
    console.log("获取access_token成功", access_token);
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (err) {
    console.error("获取access_token失败");
    console.error(err);

    return false;
  }
}
getWxCodeToken();
