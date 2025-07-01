require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateTweetFromTitle(title, link) {
  const prompt = `You are a social media content writer for the Twitter handle @aibreakhq.

Take the following article title and generate an engaging tweet. add some relevent trending hashtags.

Title: ${title}
Link: ${link}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mixtral-8x7b-instruct',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const rawText = completion.choices[0].message.content.trim();

    // Remove leading/trailing quotes if they exist
    return rawText.replace(/^"(.*)"$/, '$1');
  } catch (err) {
    console.error("❌ AI tweet generation failed:", err.message);
    throw err;
  }
}

module.exports = generateTweetFromTitle;
