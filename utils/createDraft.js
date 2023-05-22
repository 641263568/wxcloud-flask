const axios = require("axios");
// const LocalStorage = require("node-localstorage").LocalStorage;
// const localStorage = new LocalStorage("./scratch");
// const access_token = localStorage.getItem("access_token");

async function createDraft(token, articles) {
  // const token =
  //   "68_yfnna6a6c13ybUA-YKBiOUeT9NVsTp4ptw9PJo48cR5cUA_BuolbUxp5kx0x-Eiepo-e8UE9lZMS-L4b5ubf2B9agNIY-2Xn0KsCYWev2VfemZw-9Vf8Vbo02ggYTFfAFAHCO";
  // const articles = [
  //   {
  //     title: "123",
  //     author: "远程程序员",
  //     content: "content",
  //     thumb_media_id:
  //       "00JTOCn_VcWD5qa0Il8Ib4o9avzmGtO8ldjsuvVpOAvQgnKxHvtZZRd5a6Zg4eSQ",
  //   },
  // ];
  const url = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`;
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

createDraft();

module.exports = createDraft;
