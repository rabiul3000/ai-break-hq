const RSSParser = require("rss-parser");
const parser = new RSSParser();
const supabase = require("./db");
const keywords = require("./keywords");

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

module.exports = { fetchRelevantArticle, markPosted };
