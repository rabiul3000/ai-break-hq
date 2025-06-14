const client = require('./twitterClient');

const tweetNews = async ({ title, link }) => {
  const tweet = `🧠 ${title}\n${link} #AI #MachineLearning`;
  try {
    await client.v2.tweet(tweet);
    console.log("✅ Tweeted:", tweet);
  } catch (err) {
    console.error("❌ Error tweeting:", err);
  }
};

module.exports = tweetNews;
