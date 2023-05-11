const express = require("express");
const wxapi = require("../work/wxapi");
const router = express.Router();

const articles = [
  {
    title,
    author: "远程程序员",
    content,
    thumb_media_id: media_id,
  },
];
async function createDraft() {
  const url = `http://api.weixin.qq.com/cgi-bin/draft/add`;
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
