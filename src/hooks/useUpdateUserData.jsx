import { useState } from "react";
import { appwrite } from "../../config/firebaseConfig";

export const useUpdateUserData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateUserData = async (data) => {
        setIsLoading(true);

        try {
            const nameUpdate = await appwrite.account.updateName({
                name: data.name,
            });
            const emailUpdate = await appwrite.account.updateEmail({ email: data.email });

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
