import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    getIdTokenResult,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const AuthContext = createContext({
    currentUser: null,
    signUp: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    getUser: () => Promise,
    getUserUid: () => Promise,
    forgotPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                // send verification email
                sendEmailVerification(getUser());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function forgotPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email, {
                url: "https://adun-social.vercel.app/authentication/",
            });
        } catch (err) {
            console.log(err);
        }
    }

    function logout() {
        signOut(auth).then(() => {
            localStorage.clear();
            window.location.pathname = "/authentication";
        });
    }

    function getUserUid() {
        return auth.currentUser.uid;
    }

    function getUser() {
        return auth.currentUser;
    }

    const value = {
        currentUser,
        getUser,
        getUserUid,
        login,
        logout,
        signUp,
        forgotPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
