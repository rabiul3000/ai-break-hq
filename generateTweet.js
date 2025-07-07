require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ✅ Refined keyword list (hashtags allowed)
const keywords = [
  "AI",
  "ArtificialIntelligence",
  "MachineLearning",
  "DeepLearning",
  "GenAI",
  "ChatGPT",
  "LLM",
  "NLP",
  "DataScience",
  "TechTrends",
  "AIInnovation",
  "Robotics",
  "BigData",
  "AIEthics",
  "AIRevolution",
  "MultimodalAI",
  "AIAgents",
];

// 🔁 Create hashtag map (e.g., "openai" => "#OpenAI")
const hashtagMap = keywords.reduce((map, word) => {
  map[word.toLowerCase()] = `#${word.replace(/\s+/g, '')}`;
  return map;
}, {});

// 🔀 Variants for the link intro
const linkPhrases = [
  "Read more at",
  "Full article 👉",
  "full story",
  "Details 🔗",
  "More here 👉",
  "Detail",
];

// 🎲 Pick a random link intro phrase
function randomLinkIntro() {
  const idx = Math.floor(Math.random() * linkPhrases.length);
  return linkPhrases[idx];
}

// 🧼 Clean up AI output
function cleanAIOutput(str) {
  return str.trim();
}

// ✍️ Rephrase the title using AI — now with emotional, exclamatory tone
async function rephraseTitle(title) {
  const prompt = `Turn the following article title into a short, catchy, emotionally engaging tweet hook. Make it sound exciting, controversial, or surprising — something that makes people want to reply! End with an exclamation mark or rhetorical question if appropriate.Do not use any hashtags\n\nTitle: ${title}`;

  const completion = await openai.chat.completions.create({
    model: "openrouter/cypher-alpha:free",
    messages: [
      {
        role: "system",
        content: "You rewrite headlines to maximize engagement on social media. Make them bold, emotional, and interesting. Always concise.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 50,
  });

  return cleanAIOutput(completion.choices[0].message.content);
}

function getRandomHashtags() {
  const allHashtags = Object.values(hashtagMap);
  const shuffled = allHashtags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// 🧠 Main tweet generator
async function generateTweetFromTitle(title, link) {
  try {
    console.log("✍️ Rephrasing title...");
    const rephrased = await rephraseTitle(title);

    const hashtags = getRandomHashtags(); // ← using random selection
    // const hashtags = extractHashtags(title); // ← matching function disabled

    const hashtagsLine = hashtags.length ? hashtags.join(" ") : "#AINews";

    const tweet = `${rephrased}\n\n${randomLinkIntro()}: ${link}\n\n${hashtagsLine}`;
    console.log("✅ Final Tweet:\n", tweet);
    return tweet;
  } catch (err) {
    console.error("❌ Failed to generate tweet:", err.message);
    throw err;
  }
}

module.exports = generateTweetFromTitle;
