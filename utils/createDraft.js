const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const access_token = localStorage.getItem("access_token");

async function createDraft(articles) {
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add?access_token=${access_token}`;
  try {
    await axios.post(url, {
      articles,
    });
    console.log("消息推送成功");
  } catch (error) {
    console.error("Error in createDraft():", error);
    throw error;
  }
}

module.exports = createDraft;
