const RSSParser = require("rss-parser");
const parser = new RSSParser();
const supabase = require("./db");
const keywords = require("./keywords");

const postedLinks = async () => {
  const { data, error } = await supabase.from("posted_links").select("url");
  if (error) {
    console.error("Error fetching links:", error.message);
    return [];
  }
  return data.map((row) => row.url);
};

const markPosted = async (url) => {
  const { error } = await supabase.from("posted_links").insert({ url });
  if (error) {
    console.error("Error inserting link:", error.message);
  }
};

const fetchRelevantArticle = async (feeds) => {
  const alreadyPosted = await postedLinks();
  const matches = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      console.log(`🔍 Checking feed: ${feed.title} (${url})`);

      for (const item of feed.items) {
        const title = item.title || "";
        const content = item.contentSnippet || item.content || "";
        const link = item.link;
        const pubDate = new Date(item.pubDate || item.isoDate);

        if (!link || isNaN(pubDate) || alreadyPosted.includes(link)) continue;

        const fullText = (title + " " + content).toLowerCase();

        let score = 0;
        const matchedKeywords = [];

        for (const keyword of keywords) {
          const lowerKeyword = keyword.toLowerCase();
          if (fullText.includes(lowerKeyword)) {
            if (title.toLowerCase().includes(lowerKeyword)) {
              score += 4;
            } else {
              score += 2;
            }
            matchedKeywords.push(keyword);
          }
        }

        if (score > 0) {
          matches.push({ title, link, pubDate, score, matchedKeywords });
        }
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${url}:`, err.message);
    }
  }

  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score || b.pubDate - a.pubDate);
    const best = matches[0];

    // 🧠 Final log
    console.log("✅ Selected Article:");
    console.log("📰 Title:", best.title);
    console.log("🔗 Link:", best.link);
    console.log("🗞️ Published At:", best.pubDate.toLocaleString());
    console.log("🕒 Selected At:", new Date().toLocaleString());
    console.log("🎯 Reason: Score =", best.score);
    console.log("🔑 Matched Keywords:", best.matchedKeywords.join(", "));

    return { title: best.title, link: best.link };
  }

  console.log("⚠️ No relevant articles found.");
  return null;
};

module.exports = { fetchRelevantArticle, markPosted };
