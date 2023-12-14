// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import PostListPage from './PostListPage';
import CreatePostPage from './CreatePostPage';
import PostDetailsPage from './PostDetailsPage';
import SamplesForum from "./SamplesForum";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-link-transition glow-on-hover">Home</Link>
              </li>
              <li>
                <Link to="/register" className="nav-link-transition glow-on-hover">Register</Link>
              </li>
              <li>
                <Link to="/login" className="nav-link-transition glow-on-hover">Login</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/posts/:postId" element={<PostDetailsPage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/samplesforum" element={<SamplesForum />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
