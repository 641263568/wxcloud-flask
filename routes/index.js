const express = require("express");
const wxapi = require("../work/wxapi");
const router = express.Router();

async function uploadImg() {
  const url = "http://api.weixin.qq.com/cgi-bin/material/add_material";
  const formData = new FormData();
  formData.append("media", fs.createReadStream(imagePath));
  formData.append("type", "image");

  try {
    const response = await wxapi.call(url, formData);
    console.log("上传图片成功:", response.data);
    return response.data;
  } catch (error) {
    console.error("上传图片失败:", error);
  }
}

async function createDraft() {
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add`;
  const { media_id } = await uploadImg();
  const articles = [
    {
      title,
      author: "远程程序员",
      content,
      thumb_media_id: media_id,
    },
  ];
  try {
    await wxapi.call(url, {
      articles,
    });
    console.log("消息推送成功");
  } catch (error) {
    console.error("消息推送失败:", error);
    throw error;
  }
}

router.get("/", async function (req, res, next) {
  createDraft();
  res.send("success");
});

router.post("/sec", async function (req, res, next) {
  let result = {
    errcode: 0,
    errmsg: "ok",
  };
  const text = req.body.content || null;
  if (text != null) {
    result = await wxapi.call("wxa/msg_sec_check", {
      content: text,
    });
  }
  res.json(result);
});

module.exports = router;
