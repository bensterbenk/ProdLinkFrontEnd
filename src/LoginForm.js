// LoginForm.js

import React, { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the login endpoint with username and password
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                // Login successful
                // Redirect to the home page or perform any other desired action
                console.log('Login successful');
            } else {
                // Handle login error
                const data = await response.json();
                console.error('Login error:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
