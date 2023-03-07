import { ChangeEvent, useState } from "react";
import { appwrite } from "config/appwriteConfig";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";


const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        // add created at
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="flex border primary-border-round-color w-[300px] p-2 md:w-[600px] md:p-3 lg:w-[600px] lg:p-3 space-x-2">
            <UserCircleIcon className="icon-small md:icon-medium lg:icon-medium primary-text-color" />
            <form className="flex-1">
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
                        <PhotoIcon className="icon-small md:icon-medium lg:icon-medium primary-text-color cursor-pointer" />
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
                            onClick={(e) => { e.preventDefault(); console.log(formData); }}
                        >
                            {loading ? (<p>POSTING</p>) : (<p>POST</p>)}
                        </button>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default CreatePost;