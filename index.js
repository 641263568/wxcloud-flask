const express = require("express");
const createDraft = require("./utils/createDraft");
const getJson = require("./utils/getJson");
const uploadFmImg = require("./utils/uploadFmImg");
const getWxCodeToken = require("./utils/getWxCodeToken");

async function init() {
  // 获取json
  getJson();
  // 获取token
  await getWxCodeToken();
}
init();

const app = express();

app.use(express.json());
app.post("/", async (req, res) => {
  console.log("消息推送", req.body.Content);
  try {
    const data = req.body.Content;
    const title = data.split("/")[0];
    const content = data.split("/")[1];
    console.log(111, title, content);
    const media_id = await uploadFmImg(); // 获取封面图片
    console.log(222, media_id);
    const params = {
      title,
      author: "远程程序员",
      content,
      thumb_media_id: media_id,
    };
    console.log(333, params);
    await createDraft(params);
  } catch (error) {
    console.log(error);
  }
  res.send("success");
});

app.listen(80, function () {
  console.log("服务启动成功！");
});
