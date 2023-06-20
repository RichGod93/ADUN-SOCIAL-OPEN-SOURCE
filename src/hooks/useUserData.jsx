import { useState, useEffect } from "react";
import { appwrite } from "../../config/firebaseConfig";

export const useUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await appwrite.account.get();
                setUserData(currentUser);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, []);

    return userData;
};