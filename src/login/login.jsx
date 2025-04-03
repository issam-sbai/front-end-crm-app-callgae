import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../features/userSlice"; // Import the loginUserAsync action

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // To show errors to the user
    const dispatch = useDispatch(); // Redux dispatch
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // Reset error state on every login attempt
        try {
            // Dispatch the login action to Redux
            const response = await dispatch(loginUserAsync({ username, password }))
                .unwrap(); // This unwraps the promise to get the resolved value

            // On successful login, navigate to another page (e.g., dashboard)
            localStorage.setItem("token", response.token); // Store the token
            localStorage.setItem("username", response.user.username); // Store username
            localStorage.setItem("role", response.user.role); // Store user role
            localStorage.setItem("equip", JSON.stringify(response.user.equip)); // Store equip object as a string
            localStorage.setItem("equipId", response.user.equip._id); // Store equipId directly
            
            // console.log(response.user.equip._id);  // Just to verify the equip object
            
            // Redirect to dashboard or other page after successful login
            navigate("/test");

        } catch (error) {
            // Handle failed login
            if (error.response && error.response.data) {
                setError(error.response.data.error || "Login failed. Please check your username and password.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "100%", maxWidth: "500px" }}>
                <div className="card-body d-flex flex-column">
                    <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                    <p className="text-muted mb-3 text-center">Please enter your login and password!</p>

                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="text-danger mb-3">{error}</div>} {/* Display error if exists */}

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
