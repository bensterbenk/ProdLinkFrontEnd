// PostDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetailsPage() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        // Fetch a specific post based on post ID
        fetch(`http://127.0.0.1:5000/api/posts/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post details:', error));
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>Author: {post.author_name}</p>
            <p>Timestamp: {post.timestamp}</p>
            <p>Body: {post.body}</p>
            <p>Tags: {post.tags.join(', ')}</p>
            <p>Comments: {post.comments}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default PostDetailsPage;
