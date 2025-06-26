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

// Fetch and filter the most recent relevant article from all feeds
const fetchRelevantArticle = async (feeds) => {
  const alreadyPosted = await postedLinks(); // updated
  const matches = []; // updated

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      console.log(`🔍 Checking feed: ${feed.title} (${url})`); // updated

      for (const item of feed.items) {
        const title = item.title || "";
        const content = item.contentSnippet || item.content || "";
        const link = item.link;

        const pubDate = new Date(item.pubDate || item.isoDate);
        if (isNaN(pubDate)) continue; // updated: skip if no valid date

        if (!link || alreadyPosted.includes(link)) continue;

        const textToSearch = (title + " " + content).toLowerCase();
        const matchedKeyword = keywords.find((k) => {
          const regex = new RegExp(`\\b${k}\\b`, "i");
          return regex.test(textToSearch);
        });

        if (!matchedKeyword) continue;

        console.log(`✅ Matched keyword "${matchedKeyword}" in: ${title}`);
        matches.push({ title, link, pubDate });
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${url}:`, err.message);
    }
  }

  // Sort matches by pubDate descending (newest first) and return top one
  if (matches.length > 0) {
    matches.sort((a, b) => b.pubDate - a.pubDate); // updated
    return { title: matches[0].title, link: matches[0].link }; // updated
  }

  return null; // updated
};

module.exports = { fetchRelevantArticle, markPosted };
