// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/posts">View All Posts</Link>
            <Link to="/create">Create New Post</Link>
        </div>
    );
}

export default HomePage;
