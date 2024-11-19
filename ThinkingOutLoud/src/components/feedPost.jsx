import React from 'react';
import './feedPost.css';

const FeedPost = ({ username, time, title, upvotes }) => {
  return (
    <div className="feed-post">
      <h2>{title}</h2>
      <p>Posted by {username} {time} ago</p>
      <p>{upvotes} upvotes</p>
    </div>
  );
};

export default FeedPost;