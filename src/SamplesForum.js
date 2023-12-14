import React, { useState, useEffect } from 'react';

const SamplesForum = () => {
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/samplesforum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: searchText,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts);
            } else {
                console.error('Error fetching posts:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts();
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label>
                    Search:
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Search</button>
            </form>

            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.author} says: <b>{post.body}</b></p>
                    {post.tags && <p>Tags: {post.tags.join(', ')}</p>}
                </div>
            ))}
        </div>
    );
};

export default SamplesForum;
