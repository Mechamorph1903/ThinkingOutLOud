import React from "react";
import "./comment.css";

const CommentItem = ({username, comment}) => {
    return (
        <div className="comment">
            <h5>{username}</h5>
            <span><i>- {comment}</i></span>
        </div>
    )
};

export default CommentItem;