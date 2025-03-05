import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

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
      <div className="containers5">
      <div className="containers4">
      <div className="containers3">
      <div className="containers2">
      <div className="containers">
      <div className="containers1">
        {/* Banner Section */}
        <div className="banner">
          <h1 className="banner-text">Explore Books</h1>
        </div>
        <div className="container">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Books Grid */}
          <div className="book-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <div className="book-header">
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-rating">⭐ {book.rating}</p>
                  </div>
                  <p className="book-author">{book.authors.join(", ")}</p>
                  <p className="book-description">{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    );
}

export default HomePage;
