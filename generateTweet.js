require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateTweetFromTitle(title, link) {
  try {
    console.log({ msg: "generating tweet...", title, link });
    const completion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
      // model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [
        {
          role: "assistant",
          content: ` 
You are the tweet writer for AI BREAK HQ Twitter handle. now write a less then 280 characters long engaging tweet based on Title: ${title} and Link: ${link}.
- add the full url link.
          `,
        },
      ],
    });

    console.log(`AI tweet generated: ${completion.choices[0].message.content}`);
    let tweet = completion.choices[0].message.content.trim();

    // Remove wrapping double quotes only if they exist
    if (tweet.startsWith('"') && tweet.endsWith('"')) {
      tweet = tweet.slice(1, -1).trim();
    }

    console.log(`AI tweet generated: ${tweet}`);
    return tweet;
  } catch (err) {
    console.error("❌ AI tweet generation failed:", err.message);
    throw err;
  }
}

module.exports = generateTweetFromTitle;
