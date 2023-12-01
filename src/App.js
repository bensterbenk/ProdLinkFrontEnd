// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Update the import for Routes
import HomePage from './HomePage';  // Update the import path
import PostListPage from './PostListPage';  // Update the import path
import CreatePostPage from './CreatePostPage';  // Update the import path
import PostDetailsPage from './PostDetailsPage';  // Update the import path

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/posts/:postId" element={<PostDetailsPage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
