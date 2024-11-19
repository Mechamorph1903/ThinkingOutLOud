import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {supabase} from "../client";
import FeedPost from "../components/feedPost";
import {Tooltip} from 'react-tooltip';


const Feed = () => {
    // create state for posts
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        const {data, error} = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: true })
        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            console.log("Fetched posts:", data);
            // set state of posts
            setPosts(data);
        }
    };
  
    useEffect(() => {
        fetchData();
    }, []);

    return (
       <div className="feedPage">
        <h1>Feed</h1>
         <div className="feedPosts">
            {/* map through posts and render FeedPost component */}
            {posts.length > 0 ? (
                    posts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <FeedPost username={post.posted_by} time={post.created_at} title={post.title} upvotes={post.upvotes} />
                        </Link>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
           <Link to={`/post/`}> <FeedPost username="dan" time="2 hrs" title="broski" upvotes={20}/></Link>
           <Link to={`/post/`}> <FeedPost username="dan" time="2 hrs" title="broski" upvotes={20}/></Link>
           <Link to={`/post/`}> <FeedPost username="dan" time="2 hrs" title="broski" upvotes={20}/></Link>
           <Link to={`/post/`}> <FeedPost username="dan" time="2 hrs" title="broski" upvotes={20}/></Link>
        </div>
        <Tooltip anchorSelect=".feed-post" place="top">View Post</Tooltip>
       </div>
    )
};

export default Feed;