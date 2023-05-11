// Description: 创建图文消息草稿
const wxapi = require("./wxapi");

async function createDraft(articles) {
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add`;
  try {
    await wxapi.call(url, {
      articles,
    });
    console.log("消息推送成功");
  } catch (error) {
    console.error("Error in createDraft():", error);
    throw error;
  }
}

module.exports = createDraft;
