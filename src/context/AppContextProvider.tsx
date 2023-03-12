import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { appwrite, APPWRITE_DATABASE_ID, POST_COLLECTION_ID } from "config/appwriteConfig";


type User = {
    $id: string;
    email: string;
    name: string;
};

type Database = {
    $id: string;
    name: string;
};

type AppContextType = {
    user: User | null;
    databases: Database[];
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

interface Props {
    children: React.ReactNode;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    databases: [],
    login: async () => { },
    logout: () => { },
});

const AppContextProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [databases, setDatabases] = useState<Database[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const getUserData = async () => {
                try {
                    const data = await appwrite.account.get();
                    setUser(data);
                } catch (error) {
                    console.error(error);
                    setUser(null);
                }
            };
            getUserData();
        }

    }, []);

    useEffect(() => {
        if (user) {
            const getPostDatabaseData = async () => {
                try {
                    const { documents } = await appwrite.databases.listDocuments(APPWRITE_DATABASE_ID, POST_COLLECTION_ID);
                    const databaseList = documents.map((doc) => ({
                        $id: doc.$id,
                        name: doc.name,
                    }));
                    setDatabases(databaseList);
                } catch (error) {
                    console.error(error);
                    setDatabases([]);
                }
            };
            getPostDatabaseData();
        }

    }, []);


    // useEffect(() => {
    //     console.log("user updated:", user);
    //     if (user) {
    //         router.push("../home");
    //         console.log(user);
    //     }

    //     if (!user) {
    //         router.push("/");
    //     }
    // }, [user]);

    const login = async (email: string, password: string) => {
        try {
            await appwrite.account.createEmailSession(email, password);
            const data = await appwrite.account.get();
            setUser(data);
            router.push("../home");
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await appwrite.account.deleteSession("current");
            setUser(null);
            router.push("/");
        } catch (error) {
            console.error(error);
        }
        console.log("logout called");
    };

    return (
        <AppContext.Provider value={{ user, databases, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
