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
  const alreadyPosted = postedLinks();

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

module.exports = { fetchRelevantArticle, markPosted };
