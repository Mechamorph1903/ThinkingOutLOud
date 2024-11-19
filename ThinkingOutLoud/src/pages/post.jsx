import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import check from "../assets/true.png";
import CommentItem from "../components/comment";
import userIcon from "../assets/boy.png";
import commentBubble from "../assets/comment.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import { Link } from "react-router-dom";
import edit from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { formatDistanceToNow } from 'date-fns';  // Import date-fns function
import { Tooltip } from 'react-tooltip';


const Post = () => {
    const { id } = useParams();
    const commentBoxRef = useRef(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [upvotes, setUpvotes] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching post:", error);
            } else {
                console.log("Fetched post:", data);
                setPost(data);
                setComments(data.comments || []);
                setUpvotes(data.upvotes || 0);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const postComment = async () => {
        const comment = commentBoxRef.current.value;
        const updatedComments = [...comments, comment];

        const { error } = await supabase
            .from('Posts')
            .update({ comments: updatedComments })
            .eq('id', id);

        if (error) {
            console.error("Error posting comment:", error);
        } else {
            console.log("Posted comment:");
            setComments(updatedComments);
            commentBoxRef.current.value = ""; // Clear the comment box
        }
    };

    const upvotePost = async () => {
        const updatedUpvotes = upvotes + 1;

        const { error } = await supabase
            .from('Posts')
            .update({ upvotes: updatedUpvotes })
            .eq('id', id);

        if (error) {
            console.error("Error upvoting post:", error);
        } else {
            console.log("Upvoted post");
            setUpvotes(updatedUpvotes);
        }
    }

    const downvotePost = async () => {
        const updatedUpvotes = upvotes - 1;

        const { error } = await supabase
            .from('Posts')
            .update({ upvotes: updatedUpvotes })
            .eq('id', id);

        if (error) {
            console.error("Error downvoting post:", error);
        } else {
            console.log("Downvoted post");
            setUpvotes(updatedUpvotes);
        }
    };

    const deletePost = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (confirmed) {

            const { error } = await supabase
                .from('Posts')
                .delete()
                .eq('id', id);
            if (error) {
                    console.error("Error deleting post:", error);
                } else {
                    console.log("Deleted post");
                    window.location = "/";
                }
            }


       
    };



    return (
        <div className="postPage">
            <div className="post">
                <div className="postHead">
                <div className="userData">
                    <img src={userIcon} alt="" width={40} height={40} />
                    <h3>{post.posted_by}</h3>
                    <img src={check} alt="verification badge" width={20} height={20}/>
                </div>
                <div className="actions">
                    <Link to={`/edit/${id}`}><img src={edit} alt="Edit Post" width={20} height={20} id="edit"/></Link>
                    <img src={deleteIcon} alt="Delete Post" width={20} height={20}  id="deletePost" onClick={deletePost}/>
                    <Tooltip anchorSelect="#edit" place="top">Edit Post</Tooltip>
                    <Tooltip anchorSelect="#deletePost" place="top">Delete Post</Tooltip>
                </div>
                </div>

                <h1 id="postTitle">{post.title}</h1>
                <em><h5>Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</h5></em>
                <hr />
                <p>{post.content}</p>
                <div id="imageContainer">
                    {post.image !== "N/A" && <img src={post.image} alt="post Image" id="postImage"/>}
                </div>

                <div id="votes">
                    <img src={like} alt="" width={20} height={20} onClick={upvotePost} id="upvote"/>
                    <hr />
                    <span>{upvotes > 1000 ? (`${(upvotes/1000).toFixed(1)}k`):(upvotes)}</span>
                    <hr />
                    <img src={dislike} alt="" width={20} height={20} onClick={downvotePost} id="downvote"/>
                </div>
                

                <h2>Comments <span><img src={commentBubble} alt="commentIcon" width={20} height={20} /></span></h2>
                <div className="comments">
                    <div className="commentContainer">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <CommentItem key={index} username={`User ${index + 1}`} comment={comment} />
                            ))
                        ) : (
                            <p>No comments available</p>
                        )}
                    </div>
                </div>
                <div id="commentInputs">
                <textarea name="comments" id="commentBox" ref={commentBoxRef}></textarea>
                <button onClick={postComment} id="postComment">Post Comment</button>
                </div>
            </div>
        </div>
    );
};

export default Post;