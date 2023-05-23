const createDraft = require("../utils/createDraft");
const uploadFmImg = require("../utils/uploadFmImg");
const getWxCodeToken = require("../utils/getWxCodeToken");

// 处理微信消息回调
const handleMessage = async (req, res) => {
  const clientIP = req.ip;
  console.log("请求的req：", req.originalUrl);
  console.log("请求的IP地址：", clientIP);

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
      const media_id = await uploadFmImg(token);
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
      res.send("success");
    } else {
      res.send("不是要发公众号的消息");
    }
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

module.exports = {
  handleMessage,
};
