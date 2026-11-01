const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing which you requested for, does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createPost = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing({
    ...req.body.listing,
    owner: req.user._id,
    image: { url, filename },
  });
  await newListing.save();
  req.flash("sucess", "New Listing Created");
  res.redirect("/listings");
};

module.exports.editListing = (req, res) => {
  let originalImageUrl = req.listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");
  res.render("listings/edit.ejs", { listing: req.listing , originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "send valid data for listing");
  }

  const listing = await Listing.findByIdAndUpdate(
    req.listing._id,
    { ...req.body.listing },
    { new: true }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("sucess", "Listing Updated");
  res.redirect("/listings");
};

module.exports.destroyListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.listing._id);
  req.flash("sucess", "Listing Deleted");
  res.redirect("/listings");
};
