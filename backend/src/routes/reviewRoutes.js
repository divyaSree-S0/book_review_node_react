const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// Get reviews for a book
router.get("/:bookId", async (req, res) => {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
});

// Submit a new review
router.post("/", async (req, res) => {
    const review = new Review(req.body);
    await review.save();
    res.json(review);
});

module.exports = router;
