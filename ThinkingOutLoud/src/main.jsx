import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CreatePost from './pages/createPost.jsx'
import EditPost from './pages/editPost.jsx'
import Post from './pages/post.jsx'
import Profile from './pages/profile.jsx'
import Feed from './pages/feed.jsx'
import Attribution from './pages/attribution.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Feed />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="profile" element={<Profile />} />
        <Route path="attribution" element={<Attribution />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
