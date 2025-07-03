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
*"Generate a tweet under 280 characters using this exact structure:  

1. **Hook (1 line):** Bold, shocking fact about ${title}.  
2. **Question (1 line):** Short thought-provoking Q.  
3. **Link:** Full URL (https://example.com).  
4. **CTA:** 'Follow @aibreakhq for AI news.'  
5. **Hashtags:** 2-3 relevant tags.  

**Current Topic:** ${title}
**Link:** ${link} 

*Requirements:*  
- Max 275 chars (leave space for retweets)  
- No vague phrases like 'read more'  
- Emoji only if it fits tone (e.g., 😱/🚨 for urgency)"*  

---  

**Example Output (269 chars):**  
"Google's Veo 3 AI is being used to create racist videos flooding TikTok. How did safety checks fail this badly?  

https://arstechnica.com/ai/2025/07/racist-ai-videos-created-with-google-veo-3-are-proliferating-on-tiktok/  

Follow @aibreakhq for AI accountability news.  
#AIethics #TechFail"
          `
             
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
