import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function BookDetails() {
    const { id } = useParams(); // Get book ID from the URL
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/books/${id}`)
            .then((res) => {
                setBook(res.data.book);
                setReviews(res.data.reviews);
            })
            .catch((err) => console.error("Error fetching book details:", err));
    }, [id]);

    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="book-details-container">
            <div className="book-details">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="book-page-image"
                />
                <div className="book-page-info">
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author">{book.authors?.join(", ") || "Unknown Author"}</p>
                    <p className="book-rating">⭐ {book.rating || "No rating"}</p>
                    <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>
                    <p className="book-description">{book.description}</p>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h3>Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="review">
                            <p><strong>{review.username}:</strong> {review.comment}</p>
                            <p>⭐ {review.rating}/5</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
}

export default BookDetails;
