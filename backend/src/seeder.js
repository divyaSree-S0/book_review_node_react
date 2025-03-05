require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Book = require("./models/Book");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const categories = ["fiction", "nonfiction", "science", "business", "technology", "history", "fantasy"];

const fetchBooks = async (query) => {
    try {
        const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${query}&maxResults=5&key=${API_KEY}`);
        return response.data.items.map(book => ({
            title: book.volumeInfo.title || "No Title",
            author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author",
            description: book.volumeInfo.description || "No Description",
            genre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : "General",
            coverImage: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "",
            rating: book.volumeInfo.averageRating || 0
        }));
    } catch (error) {
        console.error(`Error fetching books for ${query}:`, error);
        return [];
    }
};

const seedBooks = async () => {
    try {
        await Book.deleteMany();
        
        let allBooks = [];
        for (const category of categories) {
            const books = await fetchBooks(category);
            allBooks = [...allBooks, ...books];
        }

        await Book.insertMany(allBooks);
        console.log("Books added successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding books:", error);
    }
};

seedBooks();
