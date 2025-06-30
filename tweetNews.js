const client = require("./twitterClient");

const tweetNews = async ({ title, link }) => {
  const emojis = ["🧠", "🤖", "🚀", "📢", "📰", "💡", "🔍", "🧬"];
  const hashtagPool = [
    "ChatGPT", "OpenAI", "LLM", "NLP", "GenAI","AINews","TechTrends",
    "Veo3", "Gato", "DeepSeek", "Midjourney", "Gemini", "AI"
  ];

  const ctaPool = [
    "Dive into the future of AI with @aibreakhq—join our community!",
    "Stay ahead on AI breakthroughs—follow @aibreakhq for updates!",
    "Curious about LLMs? Join @aibreakhq for the latest insights!",
    "Let’s talk AI trends—connect with @aibreakhq today!",
    "Get your daily dose of AI news with @aibreakhq—join us!",
    "Explore the world of AI with @aibreakhq—follow now!",
    "Be part of the AI revolution—join @aibreakhq!",
    "Love AI and ML? Follow @aibreakhq for exclusive updates!",
    "Join our AI community at @aibreakhq for cutting-edge insights!",
    "Don’t miss out on AI advancements—follow @aibreakhq!",
  ];

  // Pick random emoji
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  // Pick 2–3 random unique hashtags
  const shuffledTags = [...hashtagPool].sort(() => 0.5 - Math.random());
  const selectedTags = shuffledTags.slice(0, Math.floor(Math.random() * 2) + 2);
  const hashtags = selectedTags.map(tag => `#${tag}`).join(" ");

  // Pick a random CTA
  const cta = ctaPool[Math.floor(Math.random() * ctaPool.length)];

  // Compose final tweet
  const tweet = `${emoji} ${title.trim()}\n${link}\n${hashtags}\n\n${cta}`;

  try {
    await client.v2.tweet(tweet);
    console.log("✅ Tweeted:", tweet);
    return true;
  } catch (err) {
    console.error("❌ Error tweeting:", err);
    return false;
  }
};

module.exports = tweetNews;
