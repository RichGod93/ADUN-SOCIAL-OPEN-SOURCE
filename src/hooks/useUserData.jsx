import { useAuth } from "@/context/AppContextProvider";
import { useState, useEffect } from "react";


export const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await currentUser;
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, []);

    return userData;
};