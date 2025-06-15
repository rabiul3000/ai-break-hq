const RSSParser = require("rss-parser");
const parser = new RSSParser();
const fs = require("fs");
const dbPath = "postedLinks.json";
const keywords = require("./keywords");

const postedLinks = () => JSON.parse(fs.readFileSync(dbPath)).links || [];

const markPosted = (link) => {
  const data = postedLinks();
  data.push(link);
  fs.writeFileSync(dbPath, JSON.stringify({ links: data }, null, 2));
};

// Optional keyword filtering

const fetchRelevantArticle = async (feeds) => {
  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      const latest = feed.items[0];
      if (!latest) continue;

      const title = latest.title || "";
      if (!keywords.some((k) => title.toLowerCase().includes(k.toLowerCase())))
        continue;
      return { title, link: latest.link };
    } catch (err) {
      console.error(`❌ Failed to fetch ${url}:`, err.message);
    }
  }
  return null;
};

module.exports = { fetchRelevantArticle, markPosted };
