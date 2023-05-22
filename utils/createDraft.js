const axios = require("axios");

async function createDraft(token, articles) {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`;
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

createDraft();

module.exports = createDraft;
