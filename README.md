# 🧠 AI Break HQ — Twitter Automation Bot

AI Break HQ is a lightweight, full-stack Node.js bot that fetches trending tech or AI news from RSS feeds, processes it, and posts formatted updates to Twitter automatically. Ideal for building a passive, engaging AI news presence using automation and intelligent filtering.

---

## 🚀 Features

* 🔁 Fetches news from RSS feeds (customizable)
* 🔍 Filters headlines based on relevant keywords
* 🧠 Generates concise, shareable tweet content
* 🐦 Posts tweets using the official Twitter API
* 🧰 Modular, customizable, and extendable
* 🗃️ Optional MongoDB support for persistent feed storage
* 🔄 GitHub Action/CRON friendly for automation

---

## 🛠️ Tech Stack

* **Node.js** — backend runtime
* **Express.js** — lightweight server (optional if extended)
* **Twitter API v2** — for posting updates
* **MongoDB** (optional) — for persistent feed source management
* **dotenv** — to manage secrets securely

---

## 📁 Project Structure

```
ai-break-hq/
├── .env                # Twitter API keys & secrets
├── index.js            # Main execution script
├── fetchNews.js        # Fetch & filter articles from RSS feeds
├── generateTweet.js    # Compose tweet content
├── tweetNews.js        # Tweet posting logic
├── twitterClient.js    # Twitter API client setup
├── keywords.js         # List of filter keywords
├── getFeedsFromDB.js   # (Optional) Load RSS sources from MongoDB
├── db.js               # MongoDB connection logic
└── package.json        # Dependencies & scripts
```

---

## 📦 Installation

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

## 🔐 Environment Variables

Create a `.env` file in the root directory and add your credentials:

```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
```

If you are not using MongoDB, you can remove `getFeedsFromDB.js` and update the feed list manually.

---

## 🧪 How It Works

1. `fetchNews.js` pulls articles from RSS feeds and filters them using `keywords.js`.
2. `generateTweet.js` formats the filtered news into tweets.
3. `tweetNews.js` posts tweets using the Twitter API.
4. You can run everything from `index.js`.

---

## ▶️ Running the Bot

### Manual Run

```bash
node index.js
```

This fetches new articles, filters them, and posts to Twitter.

---

## 🕒 Automating Tweets

### Option 1: GitHub Actions (Recommended)

You can create a `.github/workflows/post-tweet.yml` file to run on a schedule (e.g., every hour).

### Option 2: Cron Job

Set up a cron job on a server or local machine:

```bash
0 * * * * /usr/bin/node /path/to/index.js
```

---

## 🧠 Customization

* Add/edit keywords in `keywords.js`
* Add more feeds in `feeds.js` or via MongoDB
* Modify tweet template in `generateTweet.js`

---

## 📌 To-Do / Future Features

* [ ] Add media/image support in tweets
* [ ] Handle duplicate tweets gracefully
* [ ] Integrate with LinkedIn/Mastodon
* [ ] Add logging + analytics

---

## 🙌 Contributions

Pull requests are welcome! For major changes, open an issue first to discuss your idea.

---

## 🔗 Links

* 🔴 [Live Bot Profile (if public)](https://twitter.com/your_bot_username)
* 💻 [GitHub Repo](https://github.com/rabiul3000/ai-break-hq)
