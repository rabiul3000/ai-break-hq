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
       model: 'mistralai/mixtral-8x7b-instruct',
     // model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [
        {
          role: "user",
          content: `
             Write an engaging tweet for the provided ${title} and ${link}, promoting the given AI-related topic in an exciting and concise tone.
             Highlight the significance of the news and include a thought-provoking question related to the topic.
             Include a call-to-action to follow my handle @aibreakhq.
             Place the full link after a varied introductory phrase (e.g., "Check it out:", "Dive in:", or "Learn more:").
             On a new line add the CTA sentence "Follow @aibreakhq for AI updates!".
             on a new line add 2-3 trending and relevant hashtags (e.g., #AI #TechNews #ArtificialIntelligence etc).
             - keep the whole tweet under 280 characters, including the full link address.
             - include the full web link address - ${link} in the tweet, not shortened.
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
