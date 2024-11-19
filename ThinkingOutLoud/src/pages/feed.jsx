import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { supabase } from "../client";
import FeedPost from "../components/feedPost";
import { Tooltip } from 'react-tooltip';
import { formatDistanceToNow } from 'date-fns';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [sortOption, setSortOption] = useState("created_at");
    const { searchQuery } = useOutletContext();  // Retrieve searchQuery

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false });
        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts(data);
            setSortedPosts(data);
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        sortPosts(e.target.value);
    };

    const sortPosts = (option) => {
        const sorted = [...posts].sort((a, b) => {
            if (option === "created_at") {
                return new Date(b.created_at) - new Date(a.created_at);
            } else if (option === "upvotes") {
                return b.upvotes - a.upvotes;
            }
            return 0;
        });
        setSortedPosts(sorted);
    };

    // Filter posts by title using searchQuery
    useEffect(() => {
        if (searchQuery) {
            const filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSortedPosts(filteredPosts);
        } else {
            setSortedPosts(posts);
        }
    }, [searchQuery, posts]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="feedPage">
            <h1>Feed</h1>
            <div className="controls">
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="created_at">Sort by Created Time</option>
                    <option value="upvotes">Sort by Upvotes</option>
                </select>
            </div>
            <div className="feedPosts">
                {sortedPosts.length > 0 ? (
                    sortedPosts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <FeedPost
                                username={post.posted_by}
                                time={formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                title={post.title}
                                upvotes={post.upvotes}
                            />
                        </Link>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
            <Tooltip anchorSelect=".feed-post" place="top">View Post</Tooltip>
        </div>
    );
};

export default Feed;