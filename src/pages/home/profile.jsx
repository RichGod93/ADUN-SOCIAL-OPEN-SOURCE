import { Button, HomeLayout, PageHead } from "@/components";
import { useAuth } from "@/context/AppContextProvider";
import { collection, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../../config/firebaseConfig";
import { ToastContainer } from "react-toastify";



const ProfilePage = () => {
    const { currentUser } = useAuth();

    const [userType, setUserType] = useState("");

    const filepickerRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("/avatar.png");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };
    const handleClick = async () => {
        const url = await upload(photo, currentUser, setLoading);
        setPhotoURL(url);
        removeImage();
        if (url) {
            toast.success("Profile picture uploaded");
        } else {
            toast.error("Upload failed, please try again");
        }
    };

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    const removeImage = () => {
        setPhoto(null);
    };

    useEffect(() => {
        getDoc(doc(collection(db, "user_type"), auth.currentUser?.uid)).then(
            (snapshot) => {
                if (snapshot) {
                    setUserType(snapshot.data());
                }
            }
        );
    }, []);

    return (
        <>
            <PageHead title="ADUN Social" page_name="Profile" />
            <HomeLayout>
                <div className="h-screen flex flex-col justify-between px-2 space-y-3">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center">
                            <Image
                                src={photoURL}
                                height={200}
                                width={200}
                                layout="fixed"
                                objectFit="cover"
                                alt="Profile Image"
                                className="rounded-full border-2 border-gray-400"
                            />
                            <div className="flex flex-col">
                                <div
                                    className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer self-end"
                                    onClick={() => filepickerRef.current.click()}
                                >
                                    {/* <AddAPhotoIcon /> */}
                                    <input
                                        ref={filepickerRef}
                                        type="file"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </div>
                                {photo && (
                                    <div
                                        onClick={removeImage}
                                        className="cursor-pointer self-end"
                                    >
                                        <p className="text-xs text-red-500 text-center">
                                            Remove <br />
                                            Image
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            disabled={loading || !photo}
                            className="px-10 py-2 primary-bg-color dark:secondary-bg-color secondary-text-color dark:primary-text-color rounded-sm font-medium"
                            onClick={handleClick}
                        >
                            Upload Profile Picture
                        </button>
                    </div>

                    {currentUser?.admin ? (
                        <div className="flex items-center justify-center">
                            <p className="text-xs uppercase font-bold">{userType.type}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* {userType.type === "student" ? <StudentInfo /> : <StaffInfo />} */}
                </div>
                <ToastContainer />
            </HomeLayout>
        </>
    );
};

export default ProfilePage;
