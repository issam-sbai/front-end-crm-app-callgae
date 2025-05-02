import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../features/userSlice";
import { fetchClients, fetchClientsByAgentId, getClientsByEquipeThunk } from "../features/clientSlice";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const response = await dispatch(loginUserAsync({ username, password })).unwrap();

            localStorage.setItem("token", response.token);
            localStorage.setItem("username", response.user.username);
            localStorage.setItem("role", response.user.role);
            localStorage.setItem("equip", JSON.stringify(response.user.equip));
            localStorage.setItem("equipId", response.user.equip._id);

            const role = response.user.role;
            const equipId = response.user.equip._id;

            if (role === "admin" || role === "superSupervisor") {
                dispatch(fetchClients()); // Fetch all clients
            } else if (role === "superviseur") {
                dispatch(getClientsByEquipeThunk(equipId)); // Fetch clients by equipe
            } else if (role === "agent") {
                dispatch(fetchClientsByAgentId(username)); // Fetch clients by agent's equipe id
            }

            navigate("/test"); // Navigate to your page after data is loaded

        } catch (error) {
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

                    {error && <div className="text-danger mb-3">{error}</div>}

                    <button className="btn btn-primary w-100" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
