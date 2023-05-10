const axios = require("axios");
async function createDraft(articles) {
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add`;
  const response = await axios.post(url, {
    articles,
  });
  if (response.data.errcode) {
    console.error(`Failed to create draft: ${response.data.errmsg}`);
  } else {
    console.log(`草稿推送成功: ${response.data.media_id}`);
  }
}

module.exports = createDraft;
