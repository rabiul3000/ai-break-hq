require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateTweetFromTitle(title, link) {
  try {
    const prompt = `
      Generate a creative, engaging tweet (200 characters or less) about based on this Title: ${title} and this Link: ${link}.
      Use a witty tone, include a relevant hashtag, and keep it concise.
    `;
    console.log({ msg: "generating tweet...", title, link });
    const completion = await openai.chat.completions.create({
      // model: "mistralai/mixtral-8x7b-instruct",
      // model: "deepseek/deepseek-r1-distill-llama-70b:free",
     model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: [
        { role: 'system', content: 'You are a creative AI that generates engaging tweets.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7, // Controls randomness (0.7 for creative but coherent output)
      max_tokens: 100, // Limits the characters
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
