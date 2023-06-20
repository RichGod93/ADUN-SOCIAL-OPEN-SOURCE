import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../config/firebaseConfig";
import Post from "./Post";

function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        onSnapshot(
            query(collection(db, "posts"), orderBy("createdAt", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
        ),
            [db];
    });

    return (
        <div className="space-y-5">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    author={post.data().author}
                    userImage={post.data().userImage}
                    title={post.data().title}
                    description={post.data().description}
                    postImage={post.data().postImage}
                    createdAt={post.data().createdAt}
                />
            ))}
        </div>
    );
}

export default Posts;
