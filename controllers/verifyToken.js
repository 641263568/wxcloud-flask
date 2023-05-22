const crypto = require("crypto");

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

module.exports = {
  verifyToken,
};
