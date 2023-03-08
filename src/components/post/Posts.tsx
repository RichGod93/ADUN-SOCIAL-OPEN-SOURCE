import React, { useEffect } from "react";
import { appwrite } from "config/appwriteConfig";
import Post from "./Post";

const Posts = () => {
    useEffect(() => {
        // appwrite.databases.listDocuments("app_info", "posts", "")
    }, []);



    return (
        <>
            <Post />
        </>
    );
};

export default Posts;