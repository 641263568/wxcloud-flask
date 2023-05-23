// 处理GPT消息回调
const handleGptMessage = async (req, res) => {
  const data = {
    message: "Hello, World!",
    count: 42,
  };
  res.json(data);
  //   res.send("你好");
};

module.exports = {
  handleGptMessage,
};
