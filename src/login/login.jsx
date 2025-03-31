import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Sample users (you can replace this with your actual user logic)
    const users = [
        { username: "admin", password: "123", role: "admin" },
        { username: "gc01", password: "123", role: "agent", nameAgent: "EL HADJ" },
        { username: "gc02", password: "123", role: "agent", nameAgent: "EL HADJ" },
        { username: "gc03", password: "123", role: "agent", nameAgent: "TRAORE" },
        { username: "gc04", password: "123", role: "agent", nameAgent: "STAN" },
        { username: "gc05", password: "123", role: "agent", nameAgent: "YANN" },
        { username: "gc06", password: "123", role: "agent", nameAgent: "ALASSANE" },
        { username: "gc07", password: "123", role: "agent", nameAgent: "ABDOULAYE" },
        { username: "gc08", password: "123", role: "agent", nameAgent: "MOUSTAPHA" },
        { username: "gc09", password: "123", role: "agent", nameAgent: "LOULA" },
        { username: "gc10", password: "123", role: "agent", nameAgent: "IBRAHIMA" },
        { username: "gc11", password: "123", role: "agent", nameAgent: "DIOUMA" },
        { username: "gc12", password: "123", role: "agent", nameAgent: "NELL" },
        { username: "gc13", password: "123", role: "agent", nameAgent: "BIRA" },
        { username: "gc14", password: "123", role: "agent", nameAgent: "JAMES" }
      ];
      

    const handleLogin = () => {
        // Find the user in the users array
        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) {
            setError("Invalid username or password");
        } else {
            // Store user info in localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("role", user.role);
            localStorage.setItem("agentId", user.username); // Store agentId if applicable

            window.location.reload();

            navigate("/client"); // Redirect to dashboard after login
        }
    };

    // const handleLogin = async () => {
    //     try {
    //         const response = await fetch("http://192.168.100.26:5000/api/user/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email: username, password }), 
    //         });
    
    //         const data = await response.json();
    //         console.log(data)
    
    //         if (!response.ok) {
    //             setError(data.error || "Login failed");
    //             return;
    //         }
    
    //         // Store token and user info in localStorage
    //         localStorage.setItem("token", data.token);
    //         localStorage.setItem("username", data.user.name);
    //         localStorage.setItem("role", data.user.role);
    //         localStorage.setItem("agentId", data.user.agentId);
    
    //         // Reload page to apply authentication changes
    //         window.location.reload();
    
    //         // Redirect after login
    //         navigate("/client");
    //     } catch (err) {
    //         setError("Something went wrong. Please try again.");
    //         console.error("Login Error:", err);
    //     }
    // };

    
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
