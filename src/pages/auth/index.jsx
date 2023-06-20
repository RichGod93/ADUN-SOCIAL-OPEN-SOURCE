/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useState } from "react";
import { PageHead } from "@/components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/context/AppContextProvider";
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebaseConfig";
import { useRouter } from "next/router";
import useMounted from "@/hooks/useMounted";

const Login = () => {
    const { login } = useAuth();
    const router = useRouter();
    const mounted = useMounted();

    const userState = collection(db, "state");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
        }

        setIsSubmitting(isSubmitting, true);

        login(email, password).then(async () => {
            updateDoc(doc(userState, auth.currentUser.uid), {
                isOnline: true,
            });
            router.push("../home/");
        }).catch((error) => {
            router.push("../auth/");
            toast.error(`${error.message} try again`);
        }).finally(() => {
            () => mounted.current && setIsSubmitting(false);
        });
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <PageHead title={'ADUN Social'} page_name="Login" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl primary-text-color font-bold">Login</h1>
                        <p className="mt-4 primary-text-color">Don't have an account?{" "}
                            <Link href="../../auth/signup" className="cursor-pointer underline">
                                Sign Up
                            </Link>
                        </p>
                        <form className="flex flex-col" onSubmit={handleLogin}>
                            <label className="block mt-6 primary-text-color">Email</label>
                            <input
                                className="login-form-input"
                                placeholder="@example.com"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="block mt-6 primary-text-color">Password</label>
                            <input
                                className="login-form-input"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mt-4 self-end">
                                <Link href="../../auth/forgotpassword" className="primary-text-color cursor-pointer underline">
                                    Forgot password?
                                </Link>
                            </div>


                            <div className="mt-5">
                                <button
                                    type="submit"
                                    disabled={!email || !password}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default Login;