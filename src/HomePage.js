// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Import the CSS file

function HomePage() {
    return (
        <div className="container">
            <h1>Home Page</h1>
            <Link to="/posts" className="link link-animation">
                <i className="fas fa-list"></i> View All Posts
            </Link>
            <Link to="/create" className="link link-animation">
                <i className="fas fa-plus"></i> Create New Post
            </Link>
        </div>
    );
}

export default HomePage;
