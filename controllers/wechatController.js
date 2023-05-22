const crypto = require("crypto");
const createDraft = require("../utils/createDraft");
const uploadFmImg = require("../utils/uploadFmImg");
const getWxCodeToken = require("../utils/getWxCodeToken");

// 验证Token
const verifyToken = (req, res) => {
  const token = "benbenben"; // 你在微信公众号平台上填写的Token
  const { signature, echostr, timestamp, nonce } = req.query;

  const arr = [token, timestamp, nonce].sort().join("");
  const sha1Code = crypto.createHash("sha1");
  const code = sha1Code.update(arr, "utf8").digest("hex");

  if (code === signature) {
    res.send(echostr);
  } else {
    res.send("error");
  }
};

// 处理微信消息回调
const handleCallback = async (req, res) => {
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
    }
  } catch (error) {
    console.log(error);
  }
  res.send("success");
};

module.exports = {
  verifyToken,
  handleCallback,
};
