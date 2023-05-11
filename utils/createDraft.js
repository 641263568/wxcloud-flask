const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const access_token = localStorage.getItem("access_token");

async function createDraft(articles) {
  console.log("草稿token：", access_token);
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add?access_token=${access_token}`;
  try {
    const res = await axios.post(url, {
      articles,
    });
    console.log(res.data);
    console.log("消息推送成功");
  } catch (error) {
    console.error("Error in createDraft():", error);
    throw error;
  }
}

module.exports = createDraft;
