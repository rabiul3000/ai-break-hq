const RSSParser = require("rss-parser");
const parser = new RSSParser();

// Optional keyword filtering
const keywords = ["GPT", "OpenAI", "Transformer", "LLM", "multimodal"];

const fetchRelevantArticle = async (feeds) => {
  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      const latest = feed.items[0];
      if (!latest) continue;

      const title = latest.title || "";
      if (!keywords.some((k) => title.includes(k))) continue;

      return { title, link: latest.link };
    } catch (err) {
      console.error(`❌ Failed to fetch ${url}:`, err.message);
    }
  }
  return null;
};

module.exports = fetchRelevantArticle;
