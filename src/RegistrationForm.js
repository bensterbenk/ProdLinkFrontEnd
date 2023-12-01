import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the registration endpoint with registration data
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Registration successful
                setSuccessMessage('Registration successful. Redirecting to the home page...');
                setTimeout(() => {
                    // Redirect to the home page after a short delay
                    navigate('/');
                }, 2000);
            } else {
                // Handle registration error
                const data = await response.json();
                console.error('Registration error:', data.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
