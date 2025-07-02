require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateTweetFromTitle(title, link) {
  const prompt = `

  Write an engaging tweet for the provided title and link, promoting the given AI-related topic in an exciting and concise tone. Highlight the significance of the news and include a thought-provoking question related to the topic. Include a call-to-action to follow my handle @aibreakhq
. Place the link after a varied introductory phrase (e.g., "Check it out:", "Dive in:", or "Learn more:") followed by a line break, then add the CTA sentence "Follow @aibreakhq
 for AI updates!" on a new line, followed by another line break, and end with some relevant hashtags (e.g., #AI #TechNews #ArtificialIntelligence).


  
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
