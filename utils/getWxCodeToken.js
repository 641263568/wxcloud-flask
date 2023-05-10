const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

const appid = localStorage.getItem("appid");
const secret = localStorage.getItem("secret");

async function getWxCodeToken() {
  try {
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
    console.log("获取access_token成功");
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (err) {
    console.error("获取access_token失败");
    console.error(err);

    return false;
  }
}

module.exports = getWxCodeToken;
