// CreatePostPage.js
import React, { useState, useEffect } from 'react';

function CreatePostPage() {
    const [formData, setFormData] = useState({
        title: '',
        post: '',
        genretags: [],
        instrtags: [],
        moodtags: [],
        audio_file: null,
    });

    const [allTags, setAllTags] = useState({
        genretags: [],
        instrtags: [],
        moodtags: [],
    });

    useEffect(() => {
        // Fetch tags when the component mounts
        const fetchTags = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/tags');
                if (response.ok) {
                    const tagsData = await response.json();
                    console.log('Fetched Tags:', tagsData.tags);

                    if (tagsData.tags) {
                        setAllTags({
                            genretags: tagsData.tags.filter(tag => tag.tag_type === 'genre'),
                            instrtags: tagsData.tags.filter(tag => tag.tag_type === 'instr'),
                            moodtags: tagsData.tags.filter(tag => tag.tag_type === 'mood'),
                        });
                    } else {
                        console.error('Invalid tags structure received from the server');
                    }
                } else {
                    console.error('Error fetching tags');
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);



    const handleInputChange = (e) => {
        const { name, files, value } = e.target;
        // If it's a file input, update the state with the file object
        if (name === 'audio_file' && files.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: files[0],
            }));
        } else {
            // For other input types, update the state with the value
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleTagChange = (e) => {
        const { name, options } = e.target;
        const selectedTags = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => parseInt(option.value));

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedTags,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();

        // Append each field individually
        postData.append('title', formData.title);
        postData.append('post', formData.post);
        postData.append('audio_file', formData.audio_file);

        // Append tag arrays as JSON strings
        postData.append('genretags', JSON.stringify(formData.genretags));
        postData.append('instrtags', JSON.stringify(formData.instrtags));
        postData.append('moodtags', JSON.stringify(formData.moodtags));

        try {
            const response = await fetch('http://127.0.0.1:5000/api/newpost', {
                method: 'POST',
                body: postData,
            });

            if (response.ok) {
                // Post created successfully, redirect or show success message
                console.log('Post created successfully');
            } else {
                // Handle error
                console.error('Error creating post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h1>Create Post Page</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </label>
                <label>
                    Post:
                    <textarea name="post" value={formData.post} onChange={handleInputChange} required />
                </label>
                <label>
                    Genre Tags:
                    <select
                        name="genretags"
                        multiple
                        value={formData.genretags}
                        onChange={handleTagChange}
                        required
                    >
                        {allTags.genretags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Instrument Tags:
                    <select
                        name="instrtags"
                        multiple
                        value={formData.instrtags}
                        onChange={handleTagChange}
                        required
                    >
                        {allTags.instrtags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Instrument Tags:
                    <select
                        name="moodtags"
                        multiple
                        value={formData.moodtags}
                        onChange={handleTagChange}
                        required
                    >
                        {allTags.moodtags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Audio File:
                    <input type="file" name="audio_file" onChange={handleInputChange} accept="audio/mpeg" required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreatePostPage;
