require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ✅ Refined keyword list (hashtags allowed)
const keywords = [
  "AI",                 // Broad, high-traffic hashtag; universal appeal
  "ArtificialIntelligence", // Full term, popular for professional/tech audiences
  "MachineLearning",    // Core ML hashtag, widely used in tech communities
  "DeepLearning",       // Trending for advanced AI/ML discussions
  "GenAI",              // Short for Generative AI, booming in 2025
  "ChatGPT",            // Still a recognizable name, high engagement
  "LLM",                // Large Language Models, key for AI enthusiasts
  "NLP",                // Natural Language Processing, strong for tech niche
  "DataScience",        // Appeals to data professionals in US/South Asia
  "TechTrends",         // Broad tech hashtag for 2025 innovations
  "AIInnovation",       // Highlights AI advancements, resonates globally
  "Robotics",           // Growing interest in AI-driven robotics
  "BigData",            // Relevant for AI/ML data application
  "AIEthics",           // Emerging focus on ethical AI, especially in US
  "AIRevolution",       // Catchy, motivational hashtag for AI enthusiasts
  "MultimodalAI",       // Reflects 2025 trend of multimodal models (text, video, audio)
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
  "Catch the full story here",
  "Details 🔗",
  "More here",
  "Dive in",
];

// 🎲 Pick a random link intro phrase
function randomLinkIntro() {
  const idx = Math.floor(Math.random() * linkPhrases.length);
  return linkPhrases[idx];
}

// Utility to strip surrounding quotes
function stripQuotes(str) {
  return str.replace(/^["']+|["']+$/g, '').trim();
}

// ✍️ Rephrase the title using AI
async function rephraseTitle(title) {
  const prompt = `Rephrase this title into a short, catchy, and engaging line without changing the meaning:\n"${title}"`;

  const completion = await openai.chat.completions.create({
    model: "openrouter/cypher-alpha:free",
    messages: [
      { role: "system", content: "You rephrase headlines to make them more catchy and engaging." },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 50,
  });

  return stripQuotes(completion.choices[0].message.content.trim());
}

// 🏷️ Extract 2–3 matching hashtags based on title
function extractHashtags(title) {
  const found = new Set();
  const lowerTitle = title.toLowerCase();

  for (const keyword of keywords) {
    if (lowerTitle.includes(keyword.toLowerCase())) {
      found.add(hashtagMap[keyword.toLowerCase()]);
    }
  }

  return Array.from(found).slice(0, 3);
}

// 🧠 Main tweet generator
async function generateTweetFromTitle(title, link) {
  try {
    console.log("✍️ Rephrasing title...");
    const rephrased = await rephraseTitle(title);

    const hashtags = extractHashtags(title);
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
