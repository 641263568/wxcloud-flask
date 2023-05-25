const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { PassThrough } = require("stream");

const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890");

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer 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",
};

const handleGptMessage = async (req, res) => {
  const { content } = req.body;
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }], // You might want to replace "Hello world" with actual user input
  };

  try {
    const axiosStream = await axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers: headers,
      data: data,
      httpsAgent: proxyAgent,
      responseType: "stream",
    });

    const passThrough = new PassThrough();
    axiosStream.data.pipe(passThrough);
    res.setHeader("Content-Type", "application/json");
    passThrough.pipe(res);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleGptMessage,
};
