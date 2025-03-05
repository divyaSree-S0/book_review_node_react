import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5001/api/books")
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error fetching books:", err));
    }, []);

    const handleSearch = async () => {
        const res = await axios.get(`http://localhost:5001/api/books?q=${search}`);
        setBooks(res.data);
    };

    return (
        <div className="container">
            <h1 className="title">Featured Books</h1>
            
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search books..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="book-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        <img src={book.thumbnail} alt={book.title} className="book-image" />
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">{book.authors.join(", ")}</p>
                        <p className="book-description">{book.description}</p>
                        <p className="book-rating">⭐ {book.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
