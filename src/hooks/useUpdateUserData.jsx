import { updateEmail, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebaseConfig";

export const useUpdateUserData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateUserData = async (data) => {
        setIsLoading(true);

        try {
            const nameUpdate = await updateProfile(auth.currentUser, {
                displayName: data.name
            });
            const emailUpdate = await updateEmail(auth.currentUser, data.email);

            setIsLoading(false);
            setSuccess(true);
            return { nameUpdate, emailUpdate };
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            console.error(error);
        }
    };

    return { updateUserData, isLoading, error, success };
};
