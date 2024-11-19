import React from 'react';
import './feedPost.css';

const FeedPost = ({ username, time, title, upvotes }) => {
  return (
    <div className="feed-post">
      <h2>{title}</h2>
      <p>Posted by {username} {time}</p>
      <p>{upvotes > 1000 ? (`${(upvotes/1000).toFixed(1)}k`):(upvotes)} Like Minds</p>
    </div>
  );
};

export default FeedPost;