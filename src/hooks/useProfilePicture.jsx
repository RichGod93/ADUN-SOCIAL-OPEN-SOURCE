import { useState, useEffect } from "react";
import { PROFILE_IMAGE_BUCKET_ID, appwrite } from "../../config/firebaseConfig";
import { useUserData } from "./useUserData";

export const useProfilePicture = () => {
    const [pictureUrl, setPictureUrl] = useState(null);
    const userData = useUserData();

    useEffect(() => {
        const storage = appwrite.storage;
        const getProfilePicture = async () => {
            try {
                const response = storage.getFileView(PROFILE_IMAGE_BUCKET_ID, userData.$id);

                setPictureUrl(response.href);
            } catch (error) {
                console.error(error);
            }
        };

        getProfilePicture();
    }, []);

    return pictureUrl;
};