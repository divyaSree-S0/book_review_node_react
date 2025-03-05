import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // Import the centralized Axios instance

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        api.get(`/books/${id}`)
            .then((res) => setBook(res.data))
            .catch((err) => console.error("Error fetching book details:", err));
    }, [id]);

    return (
        <div>
            {book ? <h1>{book.title}</h1> : <p>Loading...</p>}
        </div>
    );
}

export default BookPage;
