require("dotenv").config(); // if you use .env

const { createOpenRouter } = require("@openrouter/ai-sdk-provider");
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});


async function generateTweetFromTitle(title, link) {
    const prompt = `
  You are a social media expert. Format the following AI-related article into a single tweet:
  - Add a fitting emoji at the start.  
  - If title ends with a question, include 🤔 after it.
  - Add a strong CTA that encourages to follow @aibreakhq.
  - Add 2-3 relevant, trending hashtags.
  - Include the link at the end.
  - Max 280 characters. Return only the tweet text.
  
  Title: "${title}"
  Link: ${link}
  `;
  
    const response = await openrouter.chat("mistralai/mixtral-8x7b", [
      { role: "system", content: "You are a witty tweet writer." },
      { role: "user", content: prompt }
    ]);
  
    return response.choices?.[0]?.message?.content.trim() || null;
  }
  

  module.exports = {generateTweetFromTitle}