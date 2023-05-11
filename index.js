const express = require("express");
const createDraft = require("./utils/createDraft");
const uploadFmImg = require("./utils/uploadFmImg");
const getWxCodeToken = require("./utils/getWxCodeToken");

async function init() {
  // 获取token
  await getWxCodeToken();
}

const app = express();

app.use(express.json());
app.post("/", async (req, res) => {
  await init();
  try {
    const data = req.body.Content;
    const title = data.split("666666")?.[0]?.trim();
    const contact = "联系微信：1911516114";
    const content = data.split("666666")?.[1]?.trim() + contact;
    if (title && content) {
      console.log("开始推送");
      const media_id = await uploadFmImg(); // 获取封面图片
      const params = [
        {
          title,
          author: "远程程序员",
          content,
          thumb_media_id: media_id,
        },
      ];
      await createDraft(params);
    }
  } catch (error) {
    console.log(error);
  }
  res.send("success");
});

app.listen(80, function () {
  console.log("服务启动成功！");
});
