import React, { useRef, useState } from "react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
    auth,
    db,
    getFileExtension,
    storage,
} from "../../../../config/firebaseConfig";
import {
    addDoc,
    collection,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AppContextProvider";
import Link from "next/link";

const CreatePost = () => {
    const filepickerRef = useRef(null);
    const { currentUser } = useAuth();
    const postRef = collection(db, "posts");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        created_at: Timestamp.now().toDate(),
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        if (event.target.files) {
            setFormData({ ...formData, image: event.target.files[0] });
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            image: null,
            created_at: null,
        });
        if (filepickerRef.current) {
            filepickerRef.current.value = "";
        }
    };

    const createNewPost = async (event) => {
        event.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error("Please fill all the fields");
            return;
        }

        const postWithoutImage = {
            title: formData.title,
            description: formData.description,
            author: auth.currentUser?.displayName,
            userImage: auth.currentUser?.photoURL,
            authorId: auth.currentUser.uid,
            createdAt: serverTimestamp(),
        };

        if (formData.image) {
            const storageRef = ref(
                storage,
                `post_images/${auth.currentUser.uid}/` +
                auth.currentUser.uid +
                getFileExtension(formData.image)
            );

            setLoading(true);

            resetForm();
            try {
                await uploadBytes(storageRef, formData.image);

                getDownloadURL(storageRef, formData.image).then(async (url) => {
                    await addDoc(postRef, {
                        title: formData.title,
                        description: formData.description,
                        postImage: url,
                        author: auth.currentUser?.displayName,
                        userImage: auth.currentUser?.photoURL,
                        authorId: auth.currentUser.uid,
                        createdAt: serverTimestamp(),
                    })
                        .then(() => {
                            toast.success("Post created");
                        })
                        .catch((err) => {
                            toast.error("Error creating post");
                        });
                });
            } catch {
                console.log("Failed to create post");
            }
        } else {
            resetForm();
            try {
                await addDoc(postRef, postWithoutImage)
                    .then(() => {
                        toast.success("Post created");
                    })
                    .catch((err) => {
                        toast.error("Error creating post");
                    });
            } catch {
                console.log("Failed to create post");
            }
        }

        setLoading(false);
    };

    return (
        <div className="flex secondary-bg-color border primary-border-round-color w-[300px] p-2 md:w-[600px] md:p-3 lg:w-[600px] lg:p-3 space-x-2">
            <div className="flex w-full space-x-3 p-1 justify-evenly">
                <Link href="../home/profile">
                    {auth.currentUser?.photoURL ? (
                        <Image
                            className="rounded-full"
                            src={auth.currentUser?.photoURL}
                            width={70}
                            height={70}
                            alt=""
                        />
                    ) : (
                        <UserCircleIcon className="icon-small md:icon-medium lg:icon-medium primary-text-color" />
                    )}
                </Link>
                <form className="flex-1" onSubmit={createNewPost}>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="bg-transparent font-bold text-sm border-b primary-border-b-color md:text-xl lg:text-xl primary-text-color focus:outline-none"
                        />
                        <textarea
                            name="description"
                            placeholder="Share your thoughts..."
                            value={formData.description}
                            onChange={handleChange}
                            className="bg-transparent font-medium text-sm md:text-xl lg:text-xl  primary-text-color focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-end mt-2 border-t primary-border-t-color">
                        <div className="flex items-center mt-2 space-x-2">
                            <div className="flex items-center space-x-1">
                                {formData.image && (
                                    <div onClick={removeImage}>
                                        <p className="text-xs text-red-500 text-center cursor-pointer">
                                            Remove <br />
                                            Image
                                        </p>
                                    </div>
                                )}
                                <div onClick={() => filepickerRef.current.click()}>
                                    <PhotoIcon className="icon-small md:icon-medium lg:icon-medium primary-text-color cursor-pointer" />
                                    <input
                                        ref={filepickerRef}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="py-1 px-3 md:py-2 md:px-10 lg:py-2 lg:px-10 font-semibold text-sm md:text-base lg:text-base uppercase rounded-sm shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={!formData.title || !formData.description || loading}
                            >
                                {loading ? <p>POSTING</p> : <p>POST</p>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default CreatePost;
