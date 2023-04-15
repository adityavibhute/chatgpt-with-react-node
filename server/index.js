const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8080;

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { param } = req.body;
  console.log('each promt is ', param);
  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: param,
  });
  res.status(200).json({status: 'success', data: completion.data.choices[0].text});
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});