const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const fun = async () => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(completion.data.choices[0].message);
};

fun();
