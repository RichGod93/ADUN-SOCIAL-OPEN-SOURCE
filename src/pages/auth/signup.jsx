import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { appwrite } from "../../../config/firebaseConfig";
import { ID } from "appwrite";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PageHead } from "@/components";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signup = async (event) => {
        event.preventDefault();
        try {
            await appwrite.account.create(ID.unique(), email, password, name);
            await appwrite.account.createEmailSession(email, password);

            await appwrite.account.createVerification("http://localhost:3000/home");
            toast.success("Verification email has been sent!");
            router.push("../home");
        } catch (error) {
            toast.error(`${error.message}`);
        }
    };

    return (
        <>
            <PageHead title={'ADUN Social'} page_name="Sign Up" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl font-bold primary-text-color">Sign Up</h1>
                        <p className="mt-4 primary-text-color">
                            Already have an account?{" "}
                            <Link href="../auth" className="cursor-pointer underline">
                                Login
                            </Link>
                        </p>
                        <form onSubmit={signup}>
                            <label className="block mt-6 primary-text-color">Name</label>
                            <input
                                className="signup-form-input"
                                placeholder="Name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="block mt-6 primary-text-color">Email</label>
                            <input
                                className="signup-form-input"
                                placeholder="@example.com"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="block mt-6 primary-text-color">Password</label>
                            <input
                                className="signup-form-input"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="mt-4 primary-text-color">
                                Do not forget your password 🙏
                            </p>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={!name || !email || !password}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed">
                                    Sign Up
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

export default SignUp;