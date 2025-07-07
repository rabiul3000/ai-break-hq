# ðŸ§  AI Break HQ â€” Twitter Automation Bot

**AI Break HQ** is a lightweight, full-stack Node.js bot that fetches trending tech or AI news from RSS feeds, processes it, and posts formatted updates to Twitter automatically. Ideal for building a passive, engaging AI news presence using automation and intelligent filtering.

---

## ðŸš€ Features

- ðŸ” Fetches news from RSS feeds (customizable)
- ðŸ” Filters headlines based on relevant keywords
- ðŸ§  Generates concise, shareable tweet content
- ðŸ¦ Posts tweets using the official Twitter API
- ðŸ§° Modular, customizable, and extendable
- ðŸ—ƒï¸ Optional MongoDB support for persistent feed storage
- ðŸ”„ GitHub Action/CRON friendly for automation

---

## ðŸ› ï¸ Tech Stack

- **Node.js** â€” backend runtime
- **Express.js** â€” lightweight server (optional if extended)
- **Twitter API v2** â€” for posting updates
- **MongoDB** (optional) â€” for persistent feed source management
- **dotenv** â€” to manage secrets securely

---

## ðŸ“ Project Structure

```
ai-break-hq/
â”œâ”€â”€ .env                 # Environment variables (Twitter keys, MongoDB URI)
â”œâ”€â”€ index.js             # Entry point â€“ runs the entire automation flow
â”œâ”€â”€ fetchNews.js         # Fetch and filter news from RSS feeds
â”œâ”€â”€ generateTweet.js     # Generate tweet content from news
â”œâ”€â”€ tweetNews.js         # Handle tweet posting via Twitter API
â”œâ”€â”€ twitterClient.js     # Configure and export the Twitter client
â”œâ”€â”€ keywords.js          # List of relevant keywords for filtering
â”œâ”€â”€ getFeedsFromDB.js    # Load RSS feed URLs from MongoDB (optional)
â”œâ”€â”€ db.js                # MongoDB connection logic
â”œâ”€â”€ feeds.js             # (Alternative) Hardcoded RSS feed list
â”œâ”€â”€ package.json         # Project metadata and dependencies
â””â”€â”€ README.md            # Project documentation
```

---

## ðŸ“¦ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rabiul3000/ai-break-hq.git
cd ai-break-hq
```

### 2. Install Dependencies

```bash
npm install
```

---

## ðŸ” Environment Variables

Create a `.env` file in the root directory and add your credentials:

```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
```

If you're not using MongoDB, remove `getFeedsFromDB.js` and use static RSS feeds.

---

## â–¶ï¸ Running the Bot

### Manual Run

```bash
node index.js
```

This will fetch new articles, generate tweets, and post them.

---

## ðŸ•’ Automating Tweets

### Option 1: GitHub Actions (Recommended)

You can create a `.github/workflows/post-tweet.yml` file to schedule runs automatically (e.g., every hour).

### Option 2: Cron Job

Set up a cron job on a server:

```bash
0 * * * * /usr/bin/node /path/to/index.js
```

---

## ðŸ§  Customization

- Add or edit keywords in `keywords.js`
- Add more RSS feeds in `feeds.js` or connect to MongoDB
- Modify tweet formatting in `generateTweet.js`

---

## ðŸ“Œ To-Do / Future Enhancements

- [ ] Add media/image support in tweets
- [ ] Duplicate tweet detection
- [ ] Support other platforms (e.g., Mastodon, LinkedIn)
- [ ] Add logging and analytics

---

## ðŸ™Œ Contributions

Pull requests are welcome! For significant changes, open an issue first to discuss your idea.

---

## ðŸ”— Links

- ðŸ’» [GitHub Repo](https://github.com/rabiul3000/ai-break-hq)

---
