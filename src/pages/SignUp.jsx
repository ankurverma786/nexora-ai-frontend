import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

          

            if (!response.ok) {
                alert(data.error || "Signup failed");
                return;
            }

            alert("Account created successfully!");

            navigate("/login");

        } catch (err) {

            console.log("Signup error:", err);

            alert("Something went wrong");
        }
    };

    return (
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSignup}>

                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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
                    Create Account
                </button>

                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

            </form>

        </div>
    );
}

export default Signup;