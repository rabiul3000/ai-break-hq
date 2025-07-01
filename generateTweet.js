require('dotenv').config();


const OpenAI = require('openai');


const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});



async function generateTweetFromTitle(title, link) {

  const prompt = `You are a social media content writer for the Twitter handle @aibreakhq.
      
Take the following article title and generate an engaging tweet (max 280 characters) that includes:
- A short but punchy rewrite of the headline
- The direct link to the article
- A casual but persuasive CTA that encourages users to follow @aibreakhq (e.g. "Join us", "Stay tuned", "Discover more with @aibreakhq")
- 2-3 relevant and real hashtags (from tech and AI trends)
- Include "🤔" **only if the original title is a question**
- Keep emoji natural (1–2 max)

Do NOT include angle brackets <> around the link.
Title: ${title}
Link: ${link}


`;


  const completion = await openai.chat.completions.create({
     // model: 'mistralai/mixtral-8x7b-instruct',  
     model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
    // model: 'deepseek/deepseek-v3-base:free',

    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  // return completion.choices[0].message;
return completion.choices[0].message.content.trim();
}
module.exports = generateTweetFromTitle;
