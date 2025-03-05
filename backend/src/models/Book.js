const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    coverImage: { type: String }, // URL for book cover image
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
