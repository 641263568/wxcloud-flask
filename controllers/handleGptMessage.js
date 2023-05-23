// 处理GPT消息回调
const handleGptMessage = async (req, res) => {
  // 为什么要先响应：微信服务器会在5秒内收到响应，才会认为你已经收到了消息，不会再次发送
  res.send("你好");
};

module.exports = {
  handleGptMessage,
};
