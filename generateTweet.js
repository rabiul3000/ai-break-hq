require("dotenv").config();
const OpenAI = require("openai");
const model = require("./model.js");
const hashtagWords = require("./hashtagWords.js");
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// 🔁 Create hashtag map (e.g., "openai" => "#OpenAI")
const hashtagMap = hashtagWords.reduce((map, word) => {
  map[word.toLowerCase()] = `#${word.replace(/\s+/g, "")}`;
  return map;
}, {});

// 🔀 Variants for the link intro
const linkPhrases = [
  "Dive deeper here",
  "Learn more at",
  "Continue reading",
  "Get the full scoop",
  "Check it out",
  "See what's new",
  "Explore further",
  "Find out more",
  "More info",
  "Click for details",
];

// 🎲 Pick a random link intro phrase
function randomLinkIntro() {
  const idx = Math.floor(Math.random() * linkPhrases.length);
  return linkPhrases[idx];
}

// 🧼 Clean up AI output
function cleanAIOutput(str) {
  return str
    .trim()
    .replace(/^["'“”‘’`]+|["'“”‘’`]+$/g, "") // removes quotes and smart quotes from both ends
    .replace(/\n+/g, " ") // flattens newlines
    .replace(/\s{2,}/g, " ");
}

// ✍️ Rephrase the title using AI — now with emotional, exclamatory tone
async function rephraseTitle(title) {
  const prompt = `Turn the following article title into a short, catchy, emotionally engaging tweet hook. Make it sound exciting, controversial, or surprising — something that makes people want to reply!Do not add any quotes, emojis at first and no hashtags\n\nTitle: ${title}`;

  const completion = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: "system",
        content:
          "You rewrite headlines.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 120,
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
