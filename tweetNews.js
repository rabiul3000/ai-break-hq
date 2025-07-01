const generateTweetFromTitle = require("./generateTweet");
const client = require("./twitterClient");

async function tweetNews({ title, link }) {
  try {
    const tweet = await generateTweetFromTitle(title, link);
    if (!tweet) throw new Error("AI returned no tweet");

    await client.v2.tweet(tweet);
    console.log("✅ Tweeted:", tweet);
    return true;
  } catch (err) {
    console.error("❌ Error tweeting:", err);
    return false;
  }
}

module.exports = tweetNews;
