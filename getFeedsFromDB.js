const supabase = require("./db");

const getFeedsFromDB = async () => {
  const { data, error } = await supabase.from("feeds").select("url");

  if (error) {
    console.error("❌ Error fetching feeds:", error.message);
    return [];
  }

  return data.map((row) => row.url);
};

module.exports = getFeedsFromDB;
