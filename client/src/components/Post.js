import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PostCreate from "../PostCreate";
import PostList from "../PostList";

const Post = ({ setUserToParent }) => {

    const [user, setUser] = useState("");
    const setToParent = () => {
        setUserToParent(user);
    }
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(loggedInUser);
            setToParent();
        }
    }, [])

    return (
        <div className="container mt-5">
            { user && (<h1>Welcome {user} </h1>)}
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h1>List of Posts</h1>
            <PostList />
        </div>
    )
}

export default Post;