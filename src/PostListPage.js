// PostListPage.js
import React, { useState, useEffect } from 'react';

function PostListPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from Flask API
        fetch('http://127.0.0.1:5000/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            <h2>Post List</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <a href={`/posts/${post.id}`}>{post.title} - {post.author_name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostListPage;
