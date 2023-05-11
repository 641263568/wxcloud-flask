const axios = require("axios");
async function createDraft(articles) {
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add`;
  try {
    await axios.post(url, {
      articles,
    });
    console.success("消息推送成功");
  } catch (error) {
    console.error("Error in createDraft():", error);
    throw error;
  }
}

module.exports = createDraft;
