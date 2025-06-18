const { createClient } = require('@supabase/supabase-js');
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// feeds.js content
const feeds = [
  "https://www.analyticsvidhya.com/blog/feed/", // AI/ML blog posts
  "https://www.marktechpost.com/feed/", // AI news and research
  "https://www.unite.ai/feed",
  "https://the-decoder.com/feed/",
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://www.technologyreview.com/feed/",
  "https://www.wired.com/feed/category/science/latest/rss",
  "https://arstechnica.com/feed/",
  "https://www.sciencedaily.com/rss/computers_math/artificial_intelligence.xml",
  "https://towardsdatascience.com/feed",
  "https://huggingface.co/blog/feed.xml",
  "https://www.deepmind.com/blog/rss.xml",
  // google news
  "https://blog.google/rss",
  "https://cloudblog.withgoogle.com/rss",
  "https://research.google/blog/rss",
  "https://feeds.feedburner.com/GDBcode",
  "https://feeds.feedburner.com/blogspot/hsDu",
  "https://feeds.feedburner.com/GoogleAppsUpdates",
  "https://blog.chromium.org/feeds/posts/default",
];

// keywords.js content
const keywords = [
  "GPT",
  "OpenAI",
  "Transformer",
  "multimodal",
  "LLM",
  "ChatGPT",
  "DeepSeek",
  "generative",
  "GenAI",
  "agentic",
  "agents",
  "autonomous",
  "NLP",
  "natural language processing",
  "translation",
  "Gato",
  "Veo",
  "AI",
  "text-to-image",
  "gemini",
  "quantum",
  "computing",
  "machine learning",
];

// twitterClient.js content (assuming this file exists and exports a client)
// Since twitterClient.js was not provided, I'm adding a placeholder for it.
// You would replace this with the actual content of your twitterClient.js
// For example, if it uses 'twitter-api-v2':
const { TwitterApi } = require('twitter-api-v2');
const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});


// tweetNews.js content
const tweetNews = async ({ title, link }) => {
  const tweet = `🧠 ${title}\n${link} #AI #MachineLearning`;
  try {
    await client.v2.tweet(tweet);
    console.log("✅ Tweeted:", tweet);
    return true;
  } catch (err) {
    console.error("❌ Error tweeting:", err);
    return false;
  }
};


// fetchNews.js content
const RSSParser = require("rss-parser");
const parser = new RSSParser();

// Get all posted links from Supabase
const postedLinks = async () => {
  const { data, error } = await supabase.from("posted_links").select("url");
  if (error) {
    console.error("Error fetching links:", error.message);
    return [];
  }
  return data.map((row) => row.url);
};

// Insert a new posted link
const markPosted = async (url) => {
  const { error } = await supabase.from("posted_links").insert({ url });
  if (error) {
    console.error("Error inserting link:", error.message);
  }
};

// Fetch and filter relevant articles
const fetchRelevantArticle = async (feeds) => {
  const alreadyPosted = await postedLinks();

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);

      for (const item of feed.items) {
        const title = item.title || "";
        const link = item.link;

        if (!link || alreadyPosted.includes(link)) continue;

        const matchesKeyword = keywords.some((k) =>
          title.toLowerCase().includes(k.toLowerCase())
        );
        if (!matchesKeyword) continue;

        return { title, link };
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${url}:`, err.message);
    }
  }

  return null;
};


// index.js content (original)
const cron = require("node-cron");

// ── the work we want to do every run ───────────────────────────
const runBot = async () => {
  console.log("🔎  Checking feeds…", new Date().toLocaleString());
  const article = await fetchRelevantArticle(feeds);
  if (article) {
    const tweeted = await tweetNews(article);
    if (tweeted) {
      await markPosted(article.link);
    }
  } else {
    console.log("⚠️ No relevant articles found.");
  } // ← duplicate blocker
};

runBot();