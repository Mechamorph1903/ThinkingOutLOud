import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        posted_by: "",
        content: "",
        image: "",
        title: ""
    });

    

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
                }
    }; 
    fetchPost();
    }, [id]);
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const editPostSB = async (e) => {
        e.preventDefault();
        await supabase
        .from('Posts')
        .update({posted_by: post.posted_by, content: post.content, image: post.image, title: post.title})
        .eq('id', id)

        window.location = `/post/${id}`;
    }

    return (
        
                <div className="createPostPage">
                    <h1>Edit Thought</h1>
                    <div>
                    <form onSubmit={editPostSB} className="createForm">
                        <div>
                        <label for="Author">Author: <br /></label>
                        <input type="text" name="posted_by" onChange={handleChange} value={post.posted_by}/>
                        </div>

                        <div>
                        <label for="Title">Title: <br /></label>
                        <input type="text" name="title" onChange={handleChange} value={post.title}/>
                        </div>

                        <div>
                        <label for="Content">Content: <br /></label>
                        <textarea type="text" name="content" onChange={handleChange} value={post.content}/>
                        </div>

                        <div>
                        <label for="Image">Image URL: <br /></label>
                        <input type="text" name="image" onChange={handleChange} value={post.image}/>
                        </div>

                        <input type="submit" value="Edit Post"/>
                    </form>
                    </div>
                </div>
    )
};

export default EditPost;