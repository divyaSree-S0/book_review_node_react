const express = require("express");
const axios = require("axios");
const Book = require("../models/Book.js"); // Import the MongoDB Book model
const Review = require("../models/Review.js"); // Import the MongoDB Review model
require("dotenv").config();

const router = express.Router();
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Get books from MongoDB first, if none found, fetch from Google API
router.get("/", async (req, res) => {
    try {
        const { q = "", genre = "", maxResults = 10 } = req.query;

        // First, try to find books in MongoDB
        let mongoQuery = {};
        if (q) mongoQuery.title = new RegExp(q, "i"); // Case-insensitive title search
        if (genre) mongoQuery.genre = new RegExp(genre, "i"); // Case-insensitive genre filter

        const mongoBooks = await Book.find(mongoQuery).limit(maxResults);
        
        // If books exist in MongoDB, return them
        if (mongoBooks.length > 0) {
            return res.json(mongoBooks);
        }

        // Otherwise, fetch from Google Books API
        let query = q || "bestseller"; // Default to bestseller if no query
        if (genre) query += `+subject:${genre}`;

        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${GOOGLE_BOOKS_API_KEY}`;
        const response = await axios.get(url);

        const googleBooks = response.data.items?.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ["Unknown Author"],
            description: item.volumeInfo.description || "No description available.",
            genre: item.volumeInfo.categories?.[0] || "Unknown Genre", // Use first category as genre
            coverImage: item.volumeInfo.imageLinks?.thumbnail || "",
            publishedDate: item.volumeInfo.publishedDate || "Unknown Date",
            rating: item.volumeInfo.averageRating || "No rating"
        })) || [];
        

        res.json(googleBooks);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, author, description, genre, coverImage, rating } = req.body;
        
        const newBook = new Book({ title, author, description, genre, coverImage, rating });
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Failed to add book" });
    }
});

// Fetch a single book by ID with reviews
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const reviews = await Review.find({ book: book._id });

        res.json({ book, reviews });
    } catch (error) {
        console.error("Error fetching book details:", error);
        res.status(500).json({ error: "Failed to fetch book details" });
    }
});


module.exports = router;
