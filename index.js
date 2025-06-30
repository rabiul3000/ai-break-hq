const { fetchRelevantArticle, markPosted } = require("./fetchNews");
const getFeedsFromDB = require("./getFeedsFromDB");
const tweetNews = require("./tweetNews");

// ── the work we want to do every run ───────────────────────────
const runBot = async () => {
  console.log("🔎  Checking feeds…", new Date().toLocaleString());
  const feeds = await getFeedsFromDB();
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

//runBot();
runBot()
  .then(() => {
    console.log("✅ Done.");
    process.exit(0); // 🔥 Forcefully ends process — no hanging
  })
  .catch((err) => {
    console.error("💥 Uncaught error:", err);
    process.exit(1); // exits with error code if something goes wrong
  });

