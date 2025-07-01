const { openai } = require("openrouter");
const systemPrompt = `
You are a helpful social media assistant.
Given an article title and link, generate a concise, engaging Twitter post.
Use natural language, relevant emojis, 2-3 hashtags, and a brief CTA.
If the title ends in a question mark, add "🤔" after the line.

Make the tweet human-like, smart, and informal but clear.
Avoid overly generic tones. Keep it under 280 characters.

Format:
<Tweet text including emojis, hashtags, CTA and the link>
`;

const generateTweetFromTitle = async ({ title, link }) => {
  try {
    const res = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Title: ${title}\nLink: ${link}`,
        },
      ],
      temperature: 0.7,
    });

    const output = res.choices?.[0]?.message?.content?.trim();

    if (!output || output.length < 10) {
      console.error("⚠️ Empty or invalid tweet from AI:", output);
      throw new Error("AI returned no tweet");
    }

    return output;
  } catch (err) {
    console.error("🚨 Error from AI model:", err.message);
    throw new Error("AI returned no tweet");
  }
};

module.exports = generateTweetFromTitle;
