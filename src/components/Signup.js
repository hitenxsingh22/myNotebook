import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log("Response JSON:", json);

            if (json.authToken) {
                localStorage.setItem('token', json.authToken);
                navigate("/");
            } else {
                const errorMessage = json.message || "Signup failed";
                setError(errorMessage);
                console.error("Signup failed:", errorMessage);
            }
        } catch (error) {
            setError("An error occurred during signup.");
            console.error("Error during signup:", error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
        document.body.style.overflow = 'hidden'; // Hide scrollbar
        return () => {
            document.body.style.overflow = ''; // Reset overflow on unmount
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh', overflow: 'hidden' }}>
            <div className="w-100 d-flex justify-content-center">
                <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                    <h3 className="card-title text-center mb-4">Signup</h3>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={credentials.name}
                                onChange={onChange}
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={credentials.email}
                                onChange={onChange}
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={credentials.password}
                                onChange={onChange}
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                minLength={5}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={credentials.cpassword}
                                onChange={onChange}
                                id="cpassword"
                                name="cpassword"
                                placeholder="Confirm Password"
                                required
                                minLength={5}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
