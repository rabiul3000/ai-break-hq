const cron = require("node-cron");
const feeds = require("./feeds");
const { fetchRelevantArticle, markPosted } = require("./fetchNews");
const tweetNews = require("./tweetNews");

// ── the work we want to do every run ───────────────────────────
const runBot = async () => {
  console.log("🔎  Checking feeds…", new Date().toLocaleString());

  const article = await fetchRelevantArticle(feeds);

  if (!article) {
    console.log("ℹ️  No new matching article.\n");
    return;
  }

  const postedOK = await tweetNews(article);
  if (postedOK !== false) markPosted(article.link);   // ← duplicate blocker
};

// ── schedule: minute 10 of every hour ─────────────────────────
cron.schedule("0 9 * * *", runBot);   // 9:00 AM daily
cron.schedule("0 21 * * *", runBot);  // 9:00 PM daily

console.log("🕒 Bot will tweet twice per day at 09:00 and 21:00.");

// optional: run immediately once on startup
runBot();











// const feeds = require("./feeds");
// const fetchRelevantArticle = require("./fetchNews");
// const tweetNews = require("./tweetNews");

// (async () => {
//   const article = await fetchRelevantArticle(feeds);
//   if (article) {
//     await tweetNews(article);
//   } else {
//     console.log("⚠️ No relevant articles found.");
//   }
// })();
