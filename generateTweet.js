require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateTweetFromTitle(title, link) {
  const prompt = `You are a social media content writer for the Twitter handle @aibreakhq.

Take the following article title and generate an engaging tweet (max 280 characters) that includes:

1. The rewritten main tweet content (headline + hook + link) on the first line.
2. A line break.
3. Then a CTA that encourages users to follow @aibreakhq (e.g. "Join us at @aibreakhq", "Stay in the loop with @aibreakhq", etc.)
4. Another line break.
5. Then 2–3 relevant AI/tech hashtags + natural emojis (max 2).
6. Include "🤔" only if the original title is a question.

Do NOT include angle brackets <> around the link.
Do NOT wrap the tweet in quotation marks.
Keep it clean and human-readable.

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
