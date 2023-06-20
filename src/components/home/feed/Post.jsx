import React, { useEffect, useState } from "react";

import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../config/firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { useAuth } from "@/context/AppContextProvider";


export default function Post({
    id,
    author,
    userImage,
    title,
    description,
    createdAt,
    postImage,
}) {
    const { currentUser } = useAuth();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
        );
    }, [db, id]);

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === auth.currentUser?.uid) !== -1
        );
    }, [likes]);

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", auth.currentUser.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", auth.currentUser.uid), {
                username: auth.currentUser.displayName,
            });
        }
    };

    const sendComment = async (event) => {
        event.preventDefault();

        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: auth.currentUser.displayName,
            userImage: auth.currentUser.photoURL,
            timestamp: serverTimestamp(),
        })
            .then(() => {
                toast.success("Comment posted");
            })
            .catch((err) => {
                toast.error("Error posting comment");
            });
    };

    // const deletePost = async () => {
    //     await deleteDoc(doc(db, "posts", id)).then(() => {
    //         toast.success("Post deleted");
    //     });
    // };

    return (
        <div className="flex flex-col secondary-bg-color border primary-border-round-color w-[300px] p-2 md:w-[600px] md:p-3 lg:w-[600px] lg:p-3 space-x-2">
            <div className="p-1">
                <div className="flex items-center justify-between">
                    <div className="w-full flex items-center space-x-2 border-b primary-border-b-color">
                        <Image
                            className="rounded-full"
                            src={userImage}
                            width={50}
                            height={50}
                            alt=""
                        />
                        <div>
                            <p className="font-semibold text-lg">{author}</p>
                            {createdAt ? (
                                <p className="text-xs text-gray-400">
                                    {new Date(createdAt?.toDate()).toLocaleString()}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-400">Loading</p>
                            )}
                        </div>
                    </div>
                    {/* delete post */}
                    {/* {currentUser ? (
                        <div
                            className="flex items-center cursor-pointer rounded-full text-red-500 h-auto w-auto"
                            onClick={deletePost}
                        >
                            <DeleteForeverIcon />
                        </div>
                    ) : (
                        <></>
                    )} */}
                </div>
                <div className="pt-3 space-y-1">
                    <p className="font-bold text-xl">{title}</p>
                    <p className="font-medium">{description}</p>
                </div>

                {postImage && (
                    <div className="relative w-full h-56">
                        <Image
                            src={postImage}
                            alt="postImage"
                            fill={true}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                )}
            </div>
            {/* Post Footer */}
            <div className="">
                <div className="">
                    <div className="w-full p-1 border dark:border-none rounded-sm secondary-bg-color primary-text-color">
                        {comments.length > 0 && (
                            <div className="h-14 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="flex items-center space-x-2 mb-3"
                                    >
                                        <Image
                                            src={comment.data().userImage}
                                            alt=""
                                            height={30}
                                            width={30}
                                            className="rounded-full"
                                        />
                                        <p className="text-sm flex-1">
                                            <span className="font-bold">
                                                {comment.data().username}
                                            </span>{" "}
                                            {comment.data().comment}
                                        </p>
                                        <Moment fromNow className="pr-5 text-xs">
                                            {comment.data().timestamp?.toDate()}
                                        </Moment>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center justify-center w-8">
                            {hasLiked ? (
                                <FavoriteIcon
                                    onClick={likePost}
                                    className="h-5 cursor-pointer text-red-500"
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    onClick={likePost}
                                    className="h-5 cursor-pointer dark:secondary-text-color"
                                />
                            )}
                        </div>
                        <p className="px-2 dark:secondary-text-color">
                            {likes.length > 0 && (
                                <p className="font-bold">{likes.length} likes</p>
                            )}
                        </p>

                        <form className="flex items-center grow">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="border-none flex-1 focus:ring-0 outline-none dark:bg-slate-900 dark:secondary-text-color p-2"
                            />
                            <button
                                type="submit"
                                disabled={!comment.trim()}
                                onClick={sendComment}
                                className="py-1 px-2 md:py-1 md:px-7 lg:py-1 lg:px-7 font-semibold text-sm md:text-base lg:text-base uppercase rounded-sm shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
