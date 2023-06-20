import { useEffect, useRef, useState } from "react";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";


const CreatePost = () => {
    const filepickerRef = useRef(null);
    const [userDetails, setUserDetails] = useState(undefined);


    useEffect(() => {

    }, []);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        created_at: Date.now(),
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
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

    const uploadImage = async () => {
        const storage = appwrite.storage;
        try {
            const { $id } = await storage.createFile(POST_IMAGE_BUCKET_ID, ID.unique(), formData.image);
            return $id;
        } catch (error) {
            console.log('Faild to upload image: ', error);
            throw error;
        }
    };



    const createNewPost = async (event) => {
        event.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error("Please fill all the fields");
            return;
        }
        if (formData.image) {
            // create the post and store image to storage
            try {
                setLoading(true);
                await appwrite.databases.createDocument(APPWRITE_DATABASE_ID, POST_COLLECTION_ID, ID.unique(), {
                    author: userDetails?.name,
                    author_id: userDetails?.$id,
                    title: formData.title,
                    description: formData.description,
                    created_at: formData.created_at
                });
                await uploadImage();

                setLoading(false);
                toast.success("Post created!");
                resetForm();
            } catch (error) {
                toast.error("Error creating post", error);
                console.log(error);
            }
        } else {
            try {
                setLoading(true);
                await appwrite.databases.createDocument(APPWRITE_DATABASE_ID, POST_COLLECTION_ID, ID.unique(), {
                    author: userDetails?.name,
                    author_id: userDetails?.$id,
                    title: formData.title,
                    description: formData.description,
                    created_at: formData.created_at
                });
                setLoading(false);
                toast.success("Post created!");
                resetForm();
            } catch (error) {
                toast.error("Error creating post", error);
                console.log(error);
            }

        }


    };


    return (
        <div className="flex border primary-border-round-color w-[300px] p-2 md:w-[600px] md:p-3 lg:w-[600px] lg:p-3 space-x-2">
            <UserCircleIcon className="icon-small md:icon-medium lg:icon-medium primary-text-color" />
            <form className="flex-1" onSubmit={createNewPost}>
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="bg-transparent font-bold text-sm md:text-xl lg:text-xl primary-text-color focus:outline-none"
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
                            disabled={
                                !formData.title ||
                                !formData.description ||
                                loading
                            }
                        >
                            {loading ? (<p>POSTING</p>) : (<p>POST</p>)}
                        </button>
                    </div>

                </div>

            </form>
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