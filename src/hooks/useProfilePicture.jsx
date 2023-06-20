import { useState, useEffect } from "react";
import { useUserData } from "./useUserData";
import { auth, storage } from "../../config/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

export const useProfilePicture = () => {
    const [pictureUrl, setPictureUrl] = useState(null);
    const userData = useUserData();

    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const profilePictureRef = ref(storage, `profile_images/${userData.id}`);
                const downloadURL = await getDownloadURL(profilePictureRef);

                setPictureUrl(downloadURL);
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        if (auth.currentUser) {
            getProfilePicture();
        }
    }, []);

    return pictureUrl;
};