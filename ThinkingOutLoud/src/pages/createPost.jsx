import React from "react";
import { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {

    const [post, setPost] = useState({posted_by: "user",title: "N/A", upvotes: 1 , content: "N/A", image: "N/A"});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPostSB = async (e) => {
        e.preventDefault();
        await supabase
        .from('Posts')
        .insert({posted_by: post.posted_by, upvotes: post.upvotes, content: post.content, image: post.image, title: post.title})
        .select()
        window.location = "/"
    }

    return (
        <div className="createPostPage">
            <h1>New Thought</h1>
            <div>
            <form onSubmit={createPostSB} className="createForm">
                <div>
                <label for="Author">Author: <br /></label>
                <input type="text" name="posted_by" onChange={handleChange}/>
                </div>

                <div>
                <label for="Title">Title: <br /></label>
                <input type="text" name="title" onChange={handleChange}/>
                </div>

                <div>
                <label for="Content">Content: <br /></label>
                <textarea type="text" name="content" onChange={handleChange}/>
                </div>

                <div>
                <label for="Image">Image URL: <br /></label>
                <input type="text" name="image" onChange={handleChange}/>
                </div>

                <input type="submit" value="Create Post"/>
            </form>
            </div>
        </div>
    )
};

export default CreatePost;