const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Get books from Google API
router.get("/", async (req, res) => {
    try {
        const { q = "bestseller", genre = "", maxResults = 10 } = req.query;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${q}+subject:${genre}&maxResults=${maxResults}&key=${GOOGLE_BOOKS_API_KEY}`;
        
        const response = await axios.get(url);
        const books = response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ["Unknown Author"],
            description: item.volumeInfo.description || "No description available.",
            categories: item.volumeInfo.categories || ["Unknown Genre"],
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
            publishedDate: item.volumeInfo.publishedDate || "Unknown Date",
            rating: item.volumeInfo.averageRating || "No rating"
        }));

        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

module.exports = router;
