const wrapAsync = require("./utils/wrapAsync.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "User must be logged in.");
    return res.redirect("/login");
  }
  next();
};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing which you requested for, does not exist");
    return res.redirect("/listings");
  }

  if (!listing.owner || String(listing.owner) !== String(req.user._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/listings/${req.params.id}`);
  }

  req.listing = listing;
  next();
});

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = wrapAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    req.flash("error", "Listing which you requested for, does not exist");
    return res.redirect("/listings");
  }

  if (!review.author || String(review.author) !== String(req.user._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/listings/${req.params.id}`);
  }

  req.review = review;
  next();
});
