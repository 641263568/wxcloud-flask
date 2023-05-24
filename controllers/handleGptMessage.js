const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// 处理GPT消息回调
const handleGptMessage = async (req, res) => {
  console.log("123handleGptMessage...");
  const response = await openai.createCompletion(
    {
      model: "gpt-3.5-turbo",
      prompt: "How are you today?",
      message: [
        {
          role: "user",
          content: "I am fine, thank you. And you?",
        },
      ],
      // temperature: 0,
      // max_tokens: 100,
      // top_p: 1,
      // frequency_penalty: 0.0,
      // presence_penalty: 0.0,
      // stop: ["\n"],
    }
    // { timeout: 5000 }
  );
  console.log(response.data.choices[0]);
  res.json(response.data.choices[0]);
};

module.exports = {
  handleGptMessage,
};
