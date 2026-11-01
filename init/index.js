require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLAS_URL;

if (!MONGO_URL) {
  throw new Error("ATLAS_URL is not configured");
}

const initDB = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");

  const existingTitles = new Set(
    await Listing.find({
      title: { $in: initData.data.map((listing) => listing.title) },
    }).distinct("title")
  );
  const listingsToInsert = initData.data.filter(
    (listing) => !existingTitles.has(listing.title)
  );

  if (listingsToInsert.length === 0) {
    console.log("all sample listings already exist");
    return;
  }

  const owner = await User.findOne().select("_id").lean();
  const listings = owner
    ? listingsToInsert.map((listing) => ({ ...listing, owner: owner._id }))
    : listingsToInsert;

  await Listing.insertMany(listings);
  console.log(`inserted ${listings.length} sample listings`);
};

initDB()
  .catch((err) => {
    console.error("failed to initialise listings", err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
