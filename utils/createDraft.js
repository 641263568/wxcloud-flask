const axios = require("axios");
async function createDraft(articles) {
  console.log(999999);
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add`;
  data = [articles];
  const response = await axios.post(url, { data });
  console.log(response.data);
  console.log(1111);
  console.log(response);
  if (response.data.errcode) {
    console.error(`Failed to create draft: ${response.data.errmsg}`);
  } else {
    console.log(`Draft created: ${response.data.media_id}`);
  }
}

module.exports = createDraft;
