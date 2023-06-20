import { Button, HomeLayout, PageHead } from "@/components";
import { useUpdateUserData } from "@/hooks/useUpdateUserData";
import { useUserData } from "@/hooks/useUserData";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { ID } from "appwrite";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import Image from "next/image";

const ProfilePage = () => {
    const userData = useUserData();
    const pictureUrl = useProfilePicture();

    console.log(pictureUrl);

    const [updateForm, setUpdateForm] = useState({
        name: "",
        email: "",
        profilePicture: null,
    });

    const controlUpdateForm = (event) => {
        const { name, value } = event.target;

        setUpdateForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        if (event.target.files) {
            setUpdateForm({ ...updateForm, profilePicture: event.target.files[0] });
        }
    };

    const { updateUserData } = useUpdateUserData();

    useEffect(() => {
        if (!userData) return;

        setUpdateForm({
            name: userData.name,
            email: userData.email,
            profilePicture: userData.picture,
        });
    }, []);

    const uploadProfilePicture = async () => {
        const storage = appwrite.storage;
        try {
            const { $id } = await storage.createFile(
                PROFILE_IMAGE_BUCKET_ID,
                userData.$id,
                updateForm.profilePicture
            );
            return $id;
        } catch (error) {
            console.log("Faild to upload profile picture: ", error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateForm.profilePicture) {
            await uploadProfilePicture()
                .then(async () => {
                    await updateUserData(updateForm);
                    console.log("User data updated successfully");
                })
                .catch((error) => {
                    // Handle error
                    console.log(error);
                });
        } else {
            await updateUserData(updateForm)
                .then(() => {
                    console.log("User data updated successfully");
                })
                .catch((error) => {
                    // Handle error
                    console.log(error);
                });
        }
    };

    return (
        <>
            <PageHead title="ADUN Social" page_name="Profile" />
            <HomeLayout>
                {/* {!pictureUrl ? (
                ) : (
                    <UserCircleIcon className="icon-medium primary-text-color" />
                )} */}
                <Image src={pictureUrl} alt="profile picture" width={200} height={200} />

                <div>
                    <h1>Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={updateForm.name}
                            onChange={controlUpdateForm}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={updateForm.email}
                            onChange={controlUpdateForm}
                        />
                        <label htmlFor="profilePicture">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            onChange={handleImageChange}
                        />
                        <Button
                            name={"Save Changes"}
                            type={"submit"}
                            className={
                                "secondary-text-color flex items-center justify-center rounded-sm primary-bg-color p-2 font-bold uppercase tracking-widest hover:opacity-70"
                            }
                        />
                    </form>
                </div>
            </HomeLayout>
        </>
    );
};

export default ProfilePage;
