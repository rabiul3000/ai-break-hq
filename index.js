// const cron = require("node-cron");
const feeds = require("./feeds");
const { fetchRelevantArticle, markPosted } = require("./fetchNews");
const tweetNews = require("./tweetNews");

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

runBot()

// ── schedule: minute 10 of every hour ─────────────────────────

// cron.schedule("29 14 * * *", runBot, { timezone: "Asia/Dhaka" });

// Keep process alive
// setInterval(() => {}, 1e9); // dummy 16‑minute timer
