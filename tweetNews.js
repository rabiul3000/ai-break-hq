const client = require("./twitterClient");

const tweetNews = async ({ title, link }) => {
  
  const emojis = ["🧠", "🤖", "🚀", "📢", "📰", "💡", "🔍", "🧬"];  
  const hashtagPool = [
    "AI",
    "MachineLearning",
    "DeepLearning",
    "ChatGPT",
    "OpenAI",
    "LLM",
    "NLP",
    "NeuralNetworks",
    "GenAI",
    "Transformers",
    "Veo 3",
    "Gato",
    "Multimodal",
    "TechNews",
    "ArtificialIntelligence",
    "AIAgent",
    "DataScience",
  ];

  // Pick a random emoji
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  // Pick 2–3 random unique hashtags
  const shuffledTags = hashtagPool.sort(() => 0.5 - Math.random());
  const selectedTags = shuffledTags.slice(0, Math.floor(Math.random() * 2) + 2);
  const hashtags = selectedTags.map((tag) => `#${tag}`).join(" ");

  // Build the tweet
  const tweet = `${emoji} ${title}\n${link}\n${hashtags}`;

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
