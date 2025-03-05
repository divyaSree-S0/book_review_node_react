const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    comment: String
});

module.exports = mongoose.model("Review", ReviewSchema);
