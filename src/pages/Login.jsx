import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            

            if (!response.ok) {
                alert(data.error || "Login failed");
                return;
            }

            // JWT token browser mein store karo
            localStorage.setItem("token", data.token);

            alert("Login successful!");

            // Chat application par bhejo
            navigate("/chat");

        } catch (err) {

            console.log("Login error:", err);

            alert("Something went wrong");
        }
    };

    return (
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleLogin}>

                <h1>Welcome Back</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")}>
                        Signup
                    </span>
                </p>

            </form>

        </div>
    );
}

export default Login;