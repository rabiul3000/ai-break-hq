const feeds = require("./feeds");
const fetchRelevantArticle = require("./fetchNews");
const tweetNews = require("./tweetNews");

(async () => {
  const article = await fetchRelevantArticle(feeds);
  if (article) {
    await tweetNews(article);
  } else {
    console.log("⚠️ No relevant articles found.");
  }
})();
