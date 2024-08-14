import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log("Response JSON:", json);

            if (json.authToken) { // Check if authToken is present
                localStorage.setItem('token', json.authToken);
                navigate("/");
            } else {
                const errorMessage = json.message || "Invalid credentials";
                setError(errorMessage);
                console.error("Login failed:", errorMessage);
            }
        } catch (error) {
            setError("An error occurred while trying to log in.");
            console.error("Error during login:", error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = ''; // Reset overflow on unmount
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh', overflow: 'hidden' }}>
            <div className="w-100 d-flex justify-content-center" style={{ marginTop: '-50px' }}>
                <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                    <h3 className="card-title text-center mb-4">Login</h3>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={credentials.email}
                                onChange={onChange}
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={credentials.password}
                                onChange={onChange}
                                name="password"
                                id="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
