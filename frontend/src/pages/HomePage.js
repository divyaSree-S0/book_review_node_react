import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function HomePage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState(""); // State for selected genre
    const [genres, setGenres] = useState([]); // State to store unique genres
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5001/api/books")
            .then((res) => {
                setBooks(res.data);
                console.log(res.data)
                // Extract unique genres (categories) from the book list
                const uniqueGenres = [
                    ...new Set(res.data.flatMap((book) => book.genre || []))
                ];
                
                setGenres(uniqueGenres);
            })
            .catch((err) => console.error("Error fetching books:", err));
    }, []);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/api/books?q=${search}&genre=${genre}`);
            setBooks(res.data);
        } catch (error) {
            console.error("Error searching books:", error);
        }
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
            <h1>Featured Books</h1>
          {/* Search & Filter Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">All Genres</option>
              {genres.length > 0 ? (
                genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))
              ) : (
                <option disabled>No genres available</option>
              )}
            </select>
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Books Grid */}
          <div className="book-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card" onClick={() => navigate(`/books/${book._id}`)}>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-info">
                  <div className="book-header">
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-rating">⭐ {book.rating}</p>
                  </div>
                  <p className="book-author">
                    {book.authors ? book.authors.join(", ") : "Unknown Author"}
                  </p>
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
