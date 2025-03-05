import { useEffect, useState } from "react";
import api from "../api"; // Import centralized Axios instance

function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = "123"; // Replace this with actual user ID (e.g., from auth)
        api.get(`/users/${userId}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Error fetching user profile:", err));
    }, []);

    return (
        <div>
            {user ? (
                <>
                    <h1>{user.name}'s Profile</h1>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default ProfilePage;
