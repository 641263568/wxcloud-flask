const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const crypto = require("crypto");
const createDraft = require("./utils/createDraft");
const uploadFmImg = require("./utils/uploadFmImg");
const getWxCodeToken = require("./utils/getWxCodeToken");

const app = express();

app.use(xmlparser());

// 用于服务器验证token
app.get("/", (req, res) => {
  const token = "benbenben"; // 你在微信公众号平台上填写的Token
  const { signature, echostr, timestamp, nonce } = req.query;

  // 将token、timestamp、nonce三个参数进行字典序排序
  const arr = [token, timestamp, nonce].sort().join("");

  // 将三个参数字符串拼接成一个字符串进行sha1加密
  const sha1Code = crypto.createHash("sha1");
  const code = sha1Code.update(arr, "utf8").digest("hex");

  // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (code === signature) {
    res.send(echostr);
  } else {
    res.send("error");
  }
});

app.post("/", async (req, res) => {
  const token = await getWxCodeToken();
  if (!token) {
    res.send("获取token失败");
    return;
  }
  try {
    const data = req.body?.xml?.content?.[0];
    const title = data.split("666666")?.[0]?.trim();
    const contact = "联系微信：1911516114";
    const content = data.split("666666")?.[1]?.trim() + contact;
    if (title && content) {
      console.log("推送封面。。。");
      const media_id = await uploadFmImg(token); // 获取封面图片
      const params = [
        {
          title,
          author: "远程程序员",
          content,
          thumb_media_id: media_id,
        },
      ];
      console.log("推送草稿。。。");
      await createDraft(token, params);
    }
  } catch (error) {
    console.log(error);
  }
  res.send("success");
});

app.listen(3008, function () {
  console.log("服务启动成功！");
});
